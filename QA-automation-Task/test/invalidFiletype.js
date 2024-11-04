const path = require("path");

// 	TC04 - User cannot submit the form when uploading unsupported file type
module.exports = {
  beforeEach: function (browser) {
    browser.refresh(); // Ensure a clean state
  },

  "User cannot submit the form with invalid file type": function (browser) {
    const contactPage = browser.page.contact();

    contactPage
      .navigate()
      .click("@subjectHeading")
      .click('select#id_contact option[value="2"]')
      .waitForElementVisible("@emailInput", 5000)
      .setValue("@emailInput", "test@example.com")
      .setValue("@messageInput", "Testing file upload validation.")
      .setValue("@fileUpload", path.resolve(__dirname, "SiemensXQA.xlsx"))
      .click("@submitButton")
      .waitForElementVisible(".alert-danger", 7000)
      .assert.containsText(".alert-danger li", "Bad file extension");

    browser.pause(3000);
    browser.end();
  },
};
