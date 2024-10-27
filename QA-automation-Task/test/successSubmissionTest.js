const path = require("path");

module.exports = {
  "Successful Submission Test": function (browser) {
    const contactPage = browser.page.contact();

    contactPage
      .navigate()
      .waitForElementVisible("@emailInput", 5000) // Wait for email field
      .setValue("@emailInput", "sarah-farghaly@example.com") // Enter email
      .setValue("@orderReference", "987654") // Enter order reference
      .setValue(
        "@messageInput",
        "This is a successful submission test message."
      ) // Enter message

      .click("@subjectHeading") // Open dropdown
      .click('select#id_contact option[value="1"]') // Select "Webmaster"
      .setValue("@fileUpload", path.resolve(__dirname, "testfile.txt")) // Upload file
      .pause(6000) // Wait for 6 seconds

      .click("@submitButton") // Submit form

      .waitForElementVisible("@successAlert", 10000) // Wait for success message
      .assert.containsText(
        "@successAlert",
        "Your message has been successfully sent to our team."
      );

    browser.end(); // Close browser
  },
};
