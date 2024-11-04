module.exports = {
  url: "http://automationpractice.multiformis.com/index.php?controller=contact",
  elements: {
    subjectHeading: {
      selector: "select#id_contact", //#id_contact    ////*[@id="id_contact"]
    },
    emailInput: {
      selector: "#email", //#email        ////*[@id="email"]
    },
    orderReference: {
      selector: 'input[name="id_order"]', //#id_order
    },
    messageInput: {
      selector: "textarea#message",
    },
    fileUpload: {
      selector: "input#fileUpload",
    },
    submitButton: {
      selector: "#submitMessage",
    },
    successAlert: {
      selector: ".alert-success",
    },
  },
};
