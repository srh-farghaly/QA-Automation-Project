module.exports = {
  "Invalid Search Test": function (browser) {
    browser
      .url("http://automationpractice.multiformis.com/") // Open homepage
      .waitForElementVisible("#search_query_top", 5000) // Wait for search input
      .setValue("#search_query_top", "xyz123") // Enter invalid search term
      .click(".button-search") // Submit search

      // Verify the warning message is displayed
      .waitForElementVisible(".alert-warning", 5000) // Wait for alert
      .assert.containsText(
        ".alert-warning",
        'No results were found for your search "xyz123"'
      )
      .end(); // Close browser
  },
};
