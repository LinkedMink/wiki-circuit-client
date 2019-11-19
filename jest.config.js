module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/!(*.spec|*.test|*.enum|App).js",
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75
    }
  },
};