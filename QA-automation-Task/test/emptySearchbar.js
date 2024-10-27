module.exports = {
  "Empty Search Test": function (browser) {
    browser
      .url("http://automationpractice.multiformis.com/")
      .waitForElementVisible("#search_query_top", 5000) // Wait for search input
      .click(".button-search") // Click search without entering a term
      .waitForElementVisible(".alert-warning", 5000) // Wait for warning message
      .assert.containsText(".alert-warning", "Please enter a search keyword")
      .end();
  },
};
