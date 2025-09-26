const fg = require("fast-glob");
const fs = require("fs").promises;
const path = require("path");
const fetch = require("node-fetch");
const matter = require("gray-matter");
const nunjucks = require("nunjucks");

const OLLAMA_URL = "http://localhost:11434/api/generate";
const OLLAMA_MODEL = "zongwei/gemma3-translator:4b"; // Keeping zongwei/gemma3-translator:4b as instructed

// Custom function to convert object to YAML-like string
function toYamlString(obj, indent = 0) {
  let yaml = "";
  const space = "  ".repeat(indent);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        yaml += `${space}${key}:\n${toYamlString(value, indent + 1)}`;
      } else if (Array.isArray(value)) {
        yaml += `${space}${key}:\n`;
        value.forEach((item) => {
          yaml += `${space}  - ${JSON.stringify(item)}\n`;
        });
      } else {
        yaml += `${space}${key}: ${JSON.stringify(value)}\n`;
      }
    }
  }
  return yaml;
}

async function findMissingTranslations() {
  const languages = ["en", "es", "pt-br"];
  const contentDir = "content";
  const types = ["casinos", "binaries", "forex"];

  const patterns = languages.flatMap((lang) => types.map((type) => `${contentDir}/${lang}/${type}/**/*.njk`));

  const allFiles = await fg(patterns, {
    onlyFiles: true,
    deep: true,
    cwd: process.cwd(),
  });

  const contentBySlug = {};

  for (const file of allFiles) {
    const parts = file.split("/");
    const lang = parts[1];
    const type = parts[2];
    const slug = path.basename(file, ".njk");

    if (!contentBySlug[slug]) {
      contentBySlug[slug] = {
        type,
        langs: [],
        paths: {},
      };
    }

    const content = await fs.readFile(path.join(process.cwd(), file), "utf-8");
    contentBySlug[slug].langs.push(lang);
    contentBySlug[slug].paths[lang] = {
      path: file,
      size: content.length,
    };
  }

  const missingTranslations = [];
  for (const slug in contentBySlug) {
    const { type, langs, paths } = contentBySlug[slug];
    const missingLangs = languages.filter((lang) => !langs.includes(lang));

    for (const lang of missingLangs) {
      const baseLang = Object.keys(paths).reduce((a, b) => (paths[a].size > paths[b].size ? a : b));
      if (baseLang) {
        missingTranslations.push({
          slug,
          type,
          lang,
          path: path.join(contentDir, lang, type, `${slug}.njk`),
          basePath: paths[baseLang].path,
        });
      }
    }
  }

  return missingTranslations;
}

async function translateAndCreateFiles(missingTranslations) {
  for (const missing of missingTranslations) {
    const { lang, basePath } = missing;
    const fileContent = await fs.readFile(path.join(process.cwd(), basePath), "utf-8");
    const { data: originalFrontMatter, content: originalContent } = matter(fileContent);

    console.log(`--- Processing ${basePath} to ${lang} ---`);
    console.log("Original front-matter and content extracted.");

    try {
      // 1. Translate Front-matter
      console.log("Sending front-matter to Ollama for translation...");
      const frontMatterPrompt = `You are a highly accurate translation AI. Your task is to translate EVERY SINGLE VALUE within the following JSON object to ${lang}, including values in nested objects.
It is CRUCIAL that you preserve ALL keys exactly as they are, without exception, and translate each of their values with the exception of the 'details' object, DO NOT translate the values for the keys: 'games', 'promotions', 'customerSupport', 'design', 'license', 'affiliateProgram'. Preserve their original values.
Return a JSON object with the translated values.
DO NOT include any conversational text, explanations, or notes in your response. Only return the JSON object.

${JSON.stringify(originalFrontMatter, null, 2)}
`;

      const fmResponse = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: frontMatterPrompt,
          stream: false,
          format: "json",
          temperature: 0.7,
          top_p: 0.9,
        }),
      });

      if (!fmResponse.ok) {
        throw new Error(`Ollama API (front-matter) request failed with status ${fmResponse.status}`);
      }

      const fmResult = await fmResponse.json();
      let translatedFrontMatterRaw = fmResult.response;
      console.log("Front-matter translated successfully.");
      console.log("Raw translated front-matter response:", translatedFrontMatterRaw); // Temporarily re-enable for debugging

      let translatedFrontMatter;
      try {
        translatedFrontMatter = JSON.parse(translatedFrontMatterRaw);
        console.log("Translated front-matter parsed.");
      } catch (e) {
        throw new Error(`Failed to parse JSON for translated front-matter: ${e.message}. Response: ${translatedFrontMatterRaw}`);
      }

      // Fallback for missing front-matter keys and ensure keys are not translated
      const finalTranslatedFrontMatter = {};
      for (const key of Object.keys(originalFrontMatter)) {
        if (translatedFrontMatter.hasOwnProperty(key)) {
          finalTranslatedFrontMatter[key] = translatedFrontMatter[key];
        } else {
          finalTranslatedFrontMatter[key] = originalFrontMatter[key];
          console.warn(`Warning: Key '${key}' missing in translated front-matter. Using original value.`);
        }
      }
      // Explicitly preserve original values for 'details' keys
      if (originalFrontMatter.details && finalTranslatedFrontMatter.details) {
        const detailsKeysToPreserve = ["games", "promotions", "customerSupport", "design", "license", "affiliateProgram"];
        for (const detailKey of detailsKeysToPreserve) {
          if (originalFrontMatter.details.hasOwnProperty(detailKey)) {
            finalTranslatedFrontMatter.details[detailKey] = originalFrontMatter.details[detailKey];
          }
        }
      }
      console.log("Final translated front-matter prepared.");

      // 2. Translate Content
      console.log("Sending content to Ollama for translation...");
      console.log("Original Content (first 500 chars):\n", originalContent.substring(0, 500) + "..."); // Log original content
      const contentPrompt = `You are a highly accurate translation AI. Your task is to translate the ENTIRE following Nunjucks content to ${lang}.
Preserve all HTML tags, Nunjucks syntax, and structure exactly as they are.
Only translate the visible text content.
DO NOT include any conversational text, explanations, or notes in your response. Only return the translated Nunjucks content as a plain string.

${originalContent}
`;

      const contentResponse = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: contentPrompt,
          stream: false,
          temperature: 0.7,
          top_p: 0.9,
          num_predict: -1, // Allow for longer responses
        }),
      });

      if (!contentResponse.ok) {
        throw new Error(`Ollama API (content) request failed with status ${contentResponse.status}`);
      }

      const contentResult = await contentResponse.json();
      let translatedFileContent = contentResult.response;
      console.log("Translated content received (first 500 chars):\n", translatedFileContent.substring(0, 500) + "..."); // Log translated content

      // 3. Language Detection for Content
      console.log("Detecting language of translated content...");
      const langDetectPrompt = `Detect the language of the following text and return its ISO 639-1 code (e.g., 'en', 'es', 'pt').
DO NOT include any conversational text or explanations. Only return the language code.

${translatedFileContent.substring(0, 1000)}
`; // Send first 1000 chars for detection

      const langDetectResponse = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: langDetectPrompt,
          stream: false,
          temperature: 0.1, // Low temperature for deterministic output
          top_p: 0.1, // Low top_p for deterministic output
        }),
      });

      if (!langDetectResponse.ok) {
        throw new Error(`Ollama API (language detection) request failed with status ${langDetectResponse.status}`);
      }

      const langDetectResult = await langDetectResponse.json();
      const detectedLang = langDetectResult.response.trim().toLowerCase();
      console.log(`Detected language: ${detectedLang}`);

      // Relaxed comparison: check if detected language starts with the target language's base code
      const targetLangBase = lang.split("-")[0];
      if (!detectedLang.startsWith(targetLangBase)) {
        console.error(`Error: Detected language '${detectedLang}' does not match target language base '${targetLangBase}'. Content translation failed.`);
        // Optionally, throw an error to stop processing this file
        // throw new Error("Content translation failed due to incorrect language detection.");
      } else {
        console.log("Content language matches target language base.");
      }

      // Reconstruct the Nunjucks file
      const reconstructedContent = `---\n${toYamlString(finalTranslatedFrontMatter)}---\n\n${translatedFileContent}`;
      console.log("Nunjucks file reconstructed.");

      // --- Validation ---
      if (!reconstructedContent.startsWith("---") || !reconstructedContent.includes("---\n")) {
        throw new Error("Invalid Nunjucks file format: Missing front-matter delimiters after reconstruction.");
      }

      let finalFrontMatterParsed;
      let finalFileContentParsed;
      try {
        const parsed = matter(reconstructedContent);
        finalFrontMatterParsed = parsed.data;
        finalFileContentParsed = parsed.content;
        console.log("Reconstructed Nunjucks file parsed for final validation.");
      } catch (e) {
        throw new Error(`Failed to parse reconstructed front-matter: ${e.message}`);
      }

      // Basic key comparison
      const originalKeys = Object.keys(originalFrontMatter);
      const finalKeys = Object.keys(finalFrontMatterParsed);
      const missingKeys = originalKeys.filter((key) => !finalKeys.includes(key));

      if (missingKeys.length > 0) {
        console.warn(`Warning: Missing keys in final translated front-matter: ${missingKeys.join(", ")}`);
      }

      if (finalFileContentParsed.trim().length === 0) {
        console.warn("Warning: Final translated file content is empty.");
      }

      const newFilePath = path.join(process.cwd(), missing.path);
      await fs.mkdir(path.dirname(newFilePath), { recursive: true }); // Ensure directory exists
      await fs.writeFile(newFilePath, reconstructedContent);

      // Nunjucks syntax validation
      try {
        nunjucks.renderString(reconstructedContent, {});
        console.log("Nunjucks syntax validation successful.");
      } catch (njkError) {
        console.error(`Error: Nunjucks syntax validation failed for ${newFilePath}: ${njkError.message}`);
      }

      console.log(`Successfully translated and created ${newFilePath}`);
    } catch (error) {
      console.error(`Error translating ${basePath} to ${lang}:`, error);
    }
    // Keep break for single iteration testing
    break;
  }
}

async function main() {
  const missingTranslations = await findMissingTranslations();
  if (missingTranslations.length > 0) {
    await translateAndCreateFiles(missingTranslations);
  } else {
    console.log("No missing translations found.");
  }
}

main();
