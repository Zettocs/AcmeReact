module.exports = {
    preset: "react-native",
    transform: {
      "^.+\\.js$": "babel-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  };
  