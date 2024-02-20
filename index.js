const axios = require("axios");
const ethers = require("ethers");

const config = (walllet) => {
  return {
    method: "post",
    url: "https://pixel-drop.in/api.php?action=login",
    headers: {
      authority: "pixel-drop.in",
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      cookie:
        "_ga_XSLN8SZLP7=GS1.1.1707555128.1.0.1707555128.0.0.0; _ga=GA1.1.2147316481.1707555129; PHPSESSID=pidvofi9ni3rhseaglgrlmg2mk",
      origin: "https://pixel-drop.in",
      referer: "https://pixel-drop.in/?ref=ed531027",
      "sec-ch-ua":
        '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    },
    data: `{"ethAddress":"${walllet}","referralCode":"ed9f29ef"}`,
  };
};

const requestsPerSecond = 1;
let requestCounter = 0;

let limit = 1;
const interval = 1000;
let tasks = [];

async function fetchData(address) {
  try {
    const response = await axios(config(address));
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function run() {
  let requestCounter = 0;

  for (let i = 0; i < 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999; i++) {
    // Generate a new random wallet
    const wallet = ethers.Wallet.createRandom();
    const address = wallet.address;
    console.log(i, " address=", address);

    tasks.push(fetchData(address));

    if (requestCounter === limit) {
      await Promise.race([
        Promise.all(tasks),
        new Promise((resolve) => setTimeout(resolve, interval)),
      ]);
      tasks = [];
      requestCounter = 0;
    }

    requestCounter++;
  }

  await Promise.all(tasks);
  console.log("All requests completed");
}

run();
