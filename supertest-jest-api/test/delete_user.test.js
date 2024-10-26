const request = require("supertest");
const baseURL = "http://localhost:3000/api/v1";

// Helper to generate a unique email
function generateUniqueEmail() {
  const timestamp = Date.now();
  return `user-${timestamp}@gmail.com`;
}

describe("DELETE User by token", () => {
  let token; // Store token for DELETE request
  let email = generateUniqueEmail(); // Generate unique email for each run
  let password = "password123"; // Password for the new user

  // Helper function to authenticate and retrieve the token
  async function authenticateUser(userEmail, userPassword) {
    const authResponse = await request(baseURL).post("/auth").send({
      email: userEmail,
      password: userPassword,
    });

    console.log("Auth Response Body:", authResponse.body);
    expect(authResponse.status).toBe(200);
    expect(authResponse.body).toHaveProperty("token");

    token = authResponse.body.token; // Store the token
  }

  beforeAll(async () => {
    // Step 1: Create a new user
    const createUserResponse = await request(baseURL).post("/users").send({
      name: "Test User",
      email: email,
      password: password,
    });

    console.log("Create User Response:", createUserResponse.body);
    expect(createUserResponse.status).toBe(200);

    // Step 2: Authenticate the user to get a token
    await authenticateUser(email, password);
  });

  it("User can be deleted with a valid authorization token", async () => {
    // Delete the user using the token
    const deleteResponse = await request(baseURL)
      .delete("/users")
      .set("Authorization", token); // Pass the valid token

    console.log("DELETE Response:", deleteResponse.body);

    // Validate the response
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty(
      "message",
      "User deleted with success!"
    );
  });

  it("User cannot be deleted when using an invalid token", async () => {
    const invalidToken = "invalid.token.string";

    const deleteResponse = await request(baseURL)
      .delete("/users")
      .set("Authorization", invalidToken); // Use an invalid token

    console.log("DELETE Response - Invalid Token:", deleteResponse.body);

    expect(deleteResponse.status).toBe(403);
    expect(deleteResponse.body).toHaveProperty(
      "message",
      "Unauthorized to delete"
    );
  });

  it("User cannot be deleted when authorization token is missing", async () => {
    const deleteResponse = await request(baseURL)
      .delete("/users")
      .set("Authorization", ""); // No token provided

    console.log("DELETE Response - No Token:", deleteResponse.body);

    expect(deleteResponse.status).toBe(403);
    expect(deleteResponse.body).toHaveProperty(
      "message",
      "Unauthorized to delete"
    );
  });
});
