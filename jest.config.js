module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: { "^~/(.*)$": "<rootDir>/src/$1" },
  moduleFileExtensions: ["ts", "tsx", "js"],
  setupFilesAfterEnv: ["<rootDir>/lib/testing/setupEnvironment.ts"],
};