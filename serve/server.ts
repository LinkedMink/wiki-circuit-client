import express from "express";
import fs from "fs";
import path from "path";

const jwtPublicKeyFile = process.env.JWT_PUBLIC_KEY_FILE
  ? process.env.JWT_PUBLIC_KEY_FILE
  : "jwtRS256.key.pub";

const jwtPublicKey = Buffer.from(
  fs.readFileSync(jwtPublicKeyFile, "utf8")
).toString("base64");

console.log(`Loaded ${jwtPublicKeyFile}`);

const logLevelConsole = process.env.LOG_LEVEL_CONSOLE
  ? process.env.LOG_LEVEL_CONSOLE.toUpperCase()
  : "WARN";

const logLevelPersist = process.env.LOG_LEVEL_PERSIST
  ? process.env.LOG_LEVEL_PERSIST.toUpperCase()
  : "INFO";

const config = {
  urls: {
    user: process.env.USER_SERVICE_URL,
    scheduler: process.env.SCHEDULER_URL,
    article: process.env.APP_SERVER_BASE_URL,
  },
  jwtPublicKey,
  logLevelConsole,
  logLevelPersist,
};

Object.values(config.urls).forEach((url) => {
  if (!url) {
    console.error(`ERROR: Missing value for url environment variable ${url}`);
    process.exit(1);
  }
});

const app = express();

app.use(express.static("public"));

app.get("/config", function (req, res) {
  res.send(config);
  res.status(200);
});

app.get("/*", function (req, res) {
  res.sendFile(path.join("public", "index.html"));
  res.status(200);
});

app.listen(80);
