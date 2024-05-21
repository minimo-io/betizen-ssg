const axios = require("axios");
const fs = require("node:fs");

// try {
//   axios
//     .get("https://www.betizen.org/visit/verajohnes/")
//     .then(function (response) {
//       // let fetchedUrls = response.request.res.fetchedUrls;
//       // console.log(fetchedUrls);
//     });
// } catch (error) {
//   console.error(error);
// }

//  https://www.betizen.org/visit/campeonbet-es/
// https://www.betizen.org/visit/verajohnes/

async function getFirstRedirectLink(url) {
  let retUrl = "";
  try {
    let res = await axios.get(url, { maxRedirects: 0 });
    retUrl = res.request.res.headers.location;
  } catch (no200) {
    retUrl = no200.request.res.headers.location;
  }
  // await axios
  //   .get(url, { maxRedirects: 0 })
  //   .then(function (response) {
  //     return response.request.res.headers.location;
  //   })
  //   .catch(function (no200) {
  //     return no200.request.res.headers.location;
  //   });
  return retUrl;
}

let resUrl = getFirstRedirectLink(
  "https://www.betizen.org/visit/campeonbet-es/"
).then((res) => {
  console.log(res);
});
