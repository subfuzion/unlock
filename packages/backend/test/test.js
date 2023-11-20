import { join } from "path";
import { URL } from "url";

let urlStr = process.env.UNLOCK_URL;

const args = process.argv.slice(2);
if (args) {
  urlStr = args[0];
}

urlStr = urlStr || "https://gcloud-unlock-api-gsaaz6raqa-uc.a.run.app";

const url = new URL(urlStr);
url.pathname = join(url.pathname, "/api/unlock");

async function getContent(url) {
  const data = {
    args: ["sphere"],
    //    options: {
    //      "color": "millions"
    //    },
    terminfo: {
      istty: true,
      width: 120,
      height: 100,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return await response.json();
}

let result = await getContent(url);

if (result.code !== 200) {
  console.log(result.reason);
} else {
  console.log(result.content);
}
