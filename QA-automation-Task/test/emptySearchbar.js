module.exports = {
  "User leaves the search bar empty and presses Enter": function (browser) {
    const searchPage = browser.page.homepage(); // Load the page object

    searchPage
      .navigate() // Go to the URL specified in the Page Object
      .waitForElementVisible("@searchBar", 5000) // Wait for search input to be visible
      .click("@searchButton") // Click search without entering a term
      .waitForElementVisible("@alertWarning", 10000) // Wait for the warning message
      .assert.containsText("@alertWarning", "Please enter a search keyword"); // Verify the warning text

    browser.end();
  },
};
