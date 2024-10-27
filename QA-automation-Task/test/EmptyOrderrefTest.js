const path = require("path");

module.exports = {
  "Empty Order Reference Test": function (browser) {
    const contactPage = browser.page.contact();

    contactPage
      .navigate()
      .waitForElementVisible("@emailInput", 5000) // Wait for email field
      .setValue("@emailInput", "sarah-farghaly@example.com") // Enter email
      .setValue("@messageInput", "This is a test with empty order reference.") // Enter message

      .click("@subjectHeading") // Open dropdown
      .click('select#id_contact option[value="1"]') // Select "Webmaster"
      .setValue("@fileUpload", path.resolve(__dirname, "testfile.txt")) // Upload a file
      .pause(2000) // Wait for 2 seconds

      .click("@submitButton") // Submit form

      .waitForElementVisible("@successAlert", 10000) // Wait for success message
      .assert.containsText(
        "@successAlert",
        "Your message has been successfully sent to our team."
      );

    browser.end(); // Close browser
  },
};
