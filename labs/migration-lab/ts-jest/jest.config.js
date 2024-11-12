/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testResultsProcessor: "./node_modules/jest-junit-reporter",
    testMatch: ["**/?(*.)+(spec|test).ts?(x)"]
};
