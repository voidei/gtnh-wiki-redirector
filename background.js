const newWiki = "https://wiki.gtnewhorizons.com";
const excludedPaths = [];

// https://wiki.gtnewhorizons.com/w/index.php?search=asfgadfd&title=Special%3ASearch&wprov=acrw1

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);
    if (url.hostname === "wiki.gtnewhorizons.org") {
      console.log("Already at new wiki, not redirecting.");
      return;
    }

    if (url.search.length !== 0) {
      let newUrl = `${newWiki}${url.pathname}?${url.searchParams}`;
      console.log(
        `User search detected, redirecting to search from ${url.href} to ${newUrl}`
      );
      return {
        redirectUrl: newUrl,
      };
    }

    let newUrl = `${newWiki}${url.pathname}?${url.searchParams}`;
    console.log(`Redirecting from ${url.href} to ${newUrl}`);

    return {
      redirectUrl: newUrl,
    };
  },
  {
    urls: ["*://gtnh.miraheze.org/*"],
    types: [
      "main_frame",
      "sub_frame",
      "stylesheet",
      "script",
      "image",
      "object",
      "xmlhttprequest",
      "other",
    ],
  },
  ["blocking"]
);
