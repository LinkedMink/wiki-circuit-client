module.exports = {
  urls: {
    user: "https://[Your API Host]",
    scheduler: "https://[Your API Host]",
    article: "https://[Your API Host]",
  },
  jwtPublicKey:
    "[Base64(PEM) If empty, the JWT token will be decoded without verification]",
  logLevelConsole: "DEBUG",
  logLevelPersist: "WARN",
};
