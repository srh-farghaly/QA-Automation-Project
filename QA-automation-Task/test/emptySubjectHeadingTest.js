module.exports = {
  "Form submission fails when not choosing a subject heading": function (
    browser
  ) {
    const contactPage = browser.page.contact();

    contactPage
      .navigate() // Navigate to contact page

      // 1. Leave Subject Heading field empty (don't select any option)

      // 2. Fill in other mandatory fields
      .waitForElementVisible("@emailInput", 5000) // Wait for email input field
      .setValue("@emailInput", "valid-email@example.com") // Enter valid email
      .setValue("@messageInput", "This is a test for subject heading") // Enter a message

      // 3. Submit the form without selecting a subject heading
      .click("@submitButton") // Click the submit button

      // 4. Verify the error message for missing subject heading
      .waitForElementVisible(".alert-danger", 7000) // Wait for the error alert
      .assert.containsText(
        ".alert-danger li",
        "Please select a subject from the list provided."
      ); // Validate the error message

    browser.pause(3000); // Optional: Pause to observe results
    browser.end(); // Close the browser session
  },
};
