module.exports = {
  url: "http://automationpractice.multiformis.com/",
  elements: {
    searchBar: {
      selector: "#search_query_top", // Search input field
    },
    searchButton: {
      selector: "button[name='submit_search']", // Search button
    },
    searchResults: {
      selector: ".product_list", // Search results section
    },
    alertWarning: {
      selector: ".alert-warning", // Warning alert for empty search
    },
  },
};
