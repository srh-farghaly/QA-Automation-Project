module.exports = {
  "Empty Message Field Test": function (browser) {
    const contactPage = browser.page.contact();

    contactPage
      .navigate() // Navigate to contact page

      // 1. Select "Customer service" from the Subject Heading dropdown
      .click("@subjectHeading") // Open dropdown
      .click('select#id_contact option[value="2"]') // Select "Customer service"

      // 2. Enter an invalid email
      .waitForElementVisible("@emailInput", 5000) // Wait for email field
      .setValue("@emailInput", "sarah@example.com") // Enter invalid email (missing domain)

      // 3. Enter a message
      // .setValue("@messageInput", "Testing invalid email scenario.") // Enter message
      .pause(6000)
      // 4. Submit the form
      .click("@submitButton") // Submit form

      // 5. Verify the error message
      .waitForElementVisible(".alert-danger", 7000) // Wait for error alert
      .assert.containsText(
        ".alert-danger li", // Target the <li> with the error message
        "The message cannot be blank."
      );
    browser.pause(5000);

    browser.end(); // Close browser
  },
};
