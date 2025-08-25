const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const OLLAMA_URL = "http://localhost:11434/api/generate";
const OLLAMA_MODEL = "gemma3:1b";

async function runOllama(prompt) {
  try {
    const response = await axios.post(OLLAMA_URL, {
      model: OLLAMA_MODEL,
      prompt: prompt,
      stream: false,
    });
    return response.data.response.trim();
  } catch (error) {
    console.error("Error calling Ollama API:", error.message);
    return null;
  }
}

async function translateText(text, language = "English") {
  if (!text || text.trim() === "") {
    return "";
  }
  const prompt = `You are a direct text translator. Translate the text below to ${language}. Return ONLY the raw, translated text. Do not include any introductory phrases, explanations, comments, markdown, or quotes.

Original Text:
${text}`;
  
  let translation = await runOllama(prompt);

  if (translation) {
    const prefixes = [
      "Here's the translated text:",
      "Here is the translated text:",
      "The translated text is:",
      "Translation:",
    ];
    let lowerCaseTranslation = translation.toLowerCase();
    for (const prefix of prefixes) {
      if (lowerCaseTranslation.startsWith(prefix.toLowerCase())) {
        translation = translation.substring(prefix.length).trim();
        lowerCaseTranslation = translation.toLowerCase();
        break;
      }
    }

    const quotePairs = [['"', '"'], ["'", "'"], ['“', '”'], ['`', '`']];
    for (const [start, end] of quotePairs) {
        if (translation.startsWith(start) && translation.endsWith(end)) {
            translation = translation.substring(1, translation.length - 1);
            break;
        }
    }
  }

  return translation;
}

function convertCurrency(text, rate) {
    if (!text) return text;

    const regex = /R\$\s*([0-9,.]+)(k)?/gi;

    return text.replace(regex, (match, amountStr, k_suffix) => {
        let amount = parseFloat(amountStr.replace(/\./g, '').replace(',', '.'));

        if (k_suffix && k_suffix.toLowerCase() === 'k') {
            amount *= 1000;
        }

        const convertedAmount = amount * rate;
        const roundedAmount = Math.round(convertedAmount);

        if (roundedAmount >= 1000) {
            return `$${Math.round(roundedAmount / 1000)}k`;
        }

        return `$${roundedAmount}`;
    });
}

function parseMarkdownFile(content) {
  const frontMatterRegex = /^---([\s\S]*?)---/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { frontMatter: {}, body: content };
  }

  const frontMatterString = match[1];
  const body = content.substring(match[0].length).trim();
  const frontMatter = {};

  frontMatterString.trim().split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0 && !key.startsWith(' ')) {
      frontMatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });

  return { frontMatter, body };
}

function stringifyFrontMatter(frontMatter) {
  let fmString = '---\n';
  for (const [key, value] of Object.entries(frontMatter)) {
    const needsQuotes = /[:\[\]{},]/.test(value);
    const valueString = needsQuotes ? `"${value}"` : value;
    fmString += `${key}: ${valueString}\n`;
  }
  fmString += '---\n';
  return fmString;
}

async function main() {
  const sourceFileName = "20bet-casino.njk";
  const sourceLanguageDir = "pt-br";
  const targetLanguageName = "English";
  const keysToTranslate = ["title", "description", "excerpt", "meta_title", "meta_description"];
  const BRL_TO_USD_RATE = 0.1844;

  const sourceFilePath = path.join("content", sourceLanguageDir, "casinos", sourceFileName);

  try {
    console.log(`1. Reading file: ${sourceFilePath}`);
    const fileContent = await fs.readFile(sourceFilePath, "utf-8");

    console.log("2. Parsing file content...");
    const { frontMatter, body } = parseMarkdownFile(fileContent);

    const translatedFrontMatter = {};
    console.log("3. Translating and converting front-matter...");
    for (const [key, value] of Object.entries(frontMatter)) {
      if (keysToTranslate.includes(key)) {
        process.stdout.write(`    - Processing "${key}"... `);
        let translatedValue = await translateText(value, targetLanguageName);
        translatedValue = convertCurrency(translatedValue, BRL_TO_USD_RATE);
        translatedFrontMatter[key] = translatedValue;
        process.stdout.write("✅\n");
      } else {
        translatedFrontMatter[key] = convertCurrency(value, BRL_TO_USD_RATE);
      }
    }
    translatedFrontMatter.date = new Date().toISOString().split('T')[0];
    console.log("   -> Front-matter processing complete.");

    console.log("4. Translating and converting markdown body by line...");
    const bodyChunks = body.split('\n').filter(chunk => chunk.trim() !== '');
    const translatedChunks = [];
    console.log(`   - Body split into ${bodyChunks.length} chunks.`);

    for (let i = 0; i < bodyChunks.length; i++) {
      process.stdout.write(`    - Processing chunk ${i + 1} of ${bodyChunks.length}... `);
      let translatedChunk = await translateText(bodyChunks[i], targetLanguageName);
      translatedChunk = convertCurrency(translatedChunk, BRL_TO_USD_RATE);
      translatedChunks.push(translatedChunk);
      process.stdout.write("✅\n");
    }

    const translatedBody = translatedChunks.join('\n');
    console.log("   -> Body processing complete.");

    console.log("5. Assembling the new translated file.");
    const newFileContent = stringifyFrontMatter(translatedFrontMatter) + '\n' + translatedBody;

    const outputFileName = `test_output_${sourceFileName}`;
    const targetFilePath = path.join(__dirname, outputFileName);

    console.log(`6. Writing test output to: ${targetFilePath}`);
    await fs.writeFile(targetFilePath, newFileContent, "utf-8");

    console.log("\n🎉 Translation finished successfully!");

  } catch (error) {
    console.error("\n❌ An error occurred during the translation process:", error);
  }
}

main();