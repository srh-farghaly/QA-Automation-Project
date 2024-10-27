module.exports = {
  "Search Dress Test": function (browser) {
    const homepage = browser.page.homepage();

    homepage
      .navigate() // Open homepage
      .waitForElementVisible("@searchBar", 5000) // Ensure search bar is visible
      .setValue("@searchBar", "dress") // Enter the search term
      .click("@searchButton") // Click the search button
      .waitForElementVisible("@searchResults", 10000); // Wait for the search results to load

    // Use 'findElements' to retrieve product names
    browser.findElements(
      "css selector",
      "h5 a.product-name",
      function (result) {
        if (result.value.length === 0) {
          browser.assert.fail(
            "No products found matching the search term 'dress'."
          );
        } else {
          let allProductsMatch = true; // Flag to check if all products match

          result.value.forEach(function (element) {
            // Use elementIdText correctly to get the text of each product
            browser.elementIdText(
              element[Object.keys(element)[0]],
              function (textResult) {
                const productName = textResult.value.trim().toLowerCase();
                console.log("Found Product:", productName); // Logging product names

                if (!productName.includes("dress")) {
                  allProductsMatch = false; // Set flag to false if any product name doesn't match
                }
              }
            );
          });

          // Perform final assertion after iterating over all elements
          browser.perform(() => {
            if (allProductsMatch) {
              console.log("✅ All products match the search term 'dress'.");
            } else {
              browser.assert.fail(
                "❌ Some products are not related to 'dress'."
              );
            }
          });
        }
      }
    );

    browser.pause(3000); // Optional pause for debugging
    browser.end(); // Close the browser session
  },
};
