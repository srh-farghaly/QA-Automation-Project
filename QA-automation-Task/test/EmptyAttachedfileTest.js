module.exports = {
  // TC10 - User can leave the "Attach File" field empty and submits the form
  "Submit Form Without File Attachment": function (browser) {
    const contactPage = browser.page.contact();

    contactPage
      .navigate()
      .waitForElementVisible("@emailInput", 5000) // Wait for email input
      .setValue("@emailInput", "sarah-farghaly@example.com") // Enter email
      .setValue("@orderReference", "987654") // Enter order reference
      .setValue(
        "@messageInput",
        "This is a test submission without a file attachment."
      ) // Enter message

      .click("@subjectHeading") // Open dropdown
      .click('select#id_contact option[value="1"]') // Select "Webmaster"
      .pause(2000) // Wait for 2 seconds

      .click("@submitButton") // Submit the form

      .waitForElementVisible("@successAlert", 10000) // Wait for success message
      .assert.containsText(
        "@successAlert",
        "Your message has been successfully sent to our team."
      ); // Validate the success message

    browser.end(); // Close the browser
  },
};
