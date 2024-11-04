const path = require("path");

module.exports = {
  "Contact Us Form Test": function (browser) {
    const contactPage = browser.page.contact(); //page object reference

    contactPage
      .navigate()
      .waitForElementVisible("@emailInput", 5000) // Wait for email field
      .setValue("@emailInput", "test@example.com") // Enter email
      .setValue("@orderReference", "123456") // Enter order reference
      .setValue("@messageInput", "This is a test message.") // Enter message

      // Use click() to select "Customer service" option from the dropdown
      .click("@subjectHeading") // Open the dropdown
      .click('select#id_contact option[value="2"]') // Select "Customer service" option

      .setValue("@fileUpload", path.resolve(__dirname, "testfile.txt")) // Upload file
      .click("@submitButton") // Click submit button

      .waitForElementVisible("@successAlert", 10000) // Wait for success alert
      .assert.containsText(
        "@successAlert",
        "Your message has been successfully sent to our team."
      );

    browser.end();
  },
};
