module.exports = {
  "Mandatory Fields Submission Test": function (browser) {
    const contactPage = browser.page.contact();

    contactPage
      .navigate()
      .waitForElementVisible("@emailInput", 5000) // Wait for email field to appear
      .setValue("@emailInput", "test@example.com") // Enter valid email

      .setValue("@messageInput", "This is a mandatory fields test message.") // Enter message

      .click("@subjectHeading") // Open subject dropdown
      .click('select#id_contact option[value="1"]') // Select "Webmaster"

      .pause(6000) // Wait for 6 seconds before submission

      .click("@submitButton") // Submit the form

      .waitForElementVisible("@successAlert", 10000) // Wait for success message
      .assert.containsText(
        "@successAlert",
        "Your message has been successfully sent to our team."
      ); // Verify success message
    browser.pause(5000);

    browser.end(); // Close browser
  },
};
