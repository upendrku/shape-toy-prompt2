/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["jest-canvas-mock"],
  testPathIgnorePatterns: ["<rootDir>/cypress"],
};