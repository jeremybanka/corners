module.exports = {
  rootDir: `.`,
  testEnvironment: `node`,
  modulePathIgnorePatterns: [`dist`, `example`],
  moduleNameMapper: {
    "~/(.*)": `<rootDir>/src`,
  },
  testRegex: `test.(ts|tsx)$`,
  coverageDirectory: `./coverage/`,
  collectCoverage: true,
  coverageReporters: [`json`, `html`, `text`, `text-summary`],
  collectCoverageFrom: [`src/**/*.{tsx,ts}`, `tests/**/*.{tsx,ts}`],
}
