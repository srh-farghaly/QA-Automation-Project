module.exports = {
  "User searches for a product with an invalid keyword": function (browser) {
    const searchPage = browser.page.homepage(); // Load the page object

    searchPage
      .navigate() // Go to the URL specified in the Page Object
      .waitForElementVisible("@searchBar", 5000) // Wait for search input to be visible
      .setValue("@searchBar", "xyz123") // Enter invalid search term
      .click("@searchButton") // Submit search

      // Verify the warning message is displayed
      .waitForElementVisible("@alertWarning", 10000) // Wait for alert
      .assert.containsText(
        "@alertWarning",
        'No results were found for your search "xyz123"'
      ); // Verify the warning text

    browser.end();
  },
};
