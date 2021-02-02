module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/!(*.spec|*.test|*.enum|App).js"],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75,
    },
  },
  testMatch: ["<rootDir>/tests/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/Setup/StyleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/tests/Setup/FileMock.js",
  },
};
