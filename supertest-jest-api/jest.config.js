module.exports = {
  testEnvironment: "node", // Use Node.js environment for API testing
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Test Report", // Title for the HTML report
        outputPath: "./reports/test-report.html", // Output path for the report
        includeFailureMsg: true, // Show failure messages if any
        includeSuiteFailure: true, // Display suite-level failures
        includeConsoleLog: true, // Enable console logs in the report
      },
    ],
  ],
  testMatch: ["<rootDir>/test/**/*.test.js"], // Specify the test files pattern
};
