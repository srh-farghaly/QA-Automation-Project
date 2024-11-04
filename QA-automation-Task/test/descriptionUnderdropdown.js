module.exports = {
  // 	TC07 - User selects a subject heading and the corresponding description is displayed
  "Displays correct description for selected subject heading": function (
    browser
  ) {
    const contactPage = browser.page.contact();

    contactPage
      .navigate() // Navigate to contact page
      .click("@subjectHeading") // Open dropdown
      .click('select#id_contact option[value="2"]') // Select "Customer service"
      .waitForElementVisible("#desc_contact2", 5000) // Wait for the descriptive text
      .assert.containsText(
        "#desc_contact2",
        "For any question about a product, an order"
      ) // Validate the descriptive text
      .pause(4000)

      .click('select#id_contact option[value="1"]') // Select "Webmaster"
      .waitForElementVisible("#desc_contact1", 5000) // Wait for the descriptive text
      .assert.containsText(
        "#desc_contact1",
        "If a technical problem occurs on this website" // Adjust this based on actual text
      );
    browser.pause(5000);
    browser.end(); // Close browser session
  },
};
