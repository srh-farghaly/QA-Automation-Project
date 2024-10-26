const request = require("supertest");
const baseURL = "http://localhost:3000/api/v1";

// Helper to generate a unique email
function generateUniqueEmail() {
  const timestamp = Date.now();
  return `user-${timestamp}@gmail.com`;
}

describe("PATCH/users - Update User", () => {
  let token; // Store token for PATCH request
  let email = generateUniqueEmail(); // Generate unique email for each run
  let password = "password123"; // Password for the new user

  // Helper to refresh the auth token after password changes
  async function refreshAuthToken(userEmail, userPassword) {
    const authResponse = await request(baseURL).post("/auth").send({
      email: userEmail,
      password: userPassword,
    });

    console.log("Auth Response Body:", authResponse.body);
    expect(authResponse.status).toBe(200);
    expect(authResponse.body).toHaveProperty("token");

    token = authResponse.body.token; // Store the new token
    console.log(`Authenticated Token: ${token}`);
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

    // Step 2: Authenticate to get the initial token
    await refreshAuthToken(email, password);
  });

  it("All user data can be updated with a valid authorization token", async () => {
    const newEmail = generateUniqueEmail(); // Generate new unique email

    const patchResponse = await request(baseURL)
      .patch("/users")
      .set("Authorization", token) // Use valid token
      .send({
        name: "Updated User",
        email: newEmail,
        password: "newpassword123", // Update all data including password
      });

    console.log("PATCH Response - All data updated:", patchResponse.body);

    expect(patchResponse.status).toBe(200);
    expect(patchResponse.body).toHaveProperty(
      "message",
      "User updated with success!"
    );

    const userData = patchResponse.body.data;
    expect(userData).toHaveProperty("name", "Updated User");
    expect(userData).toHaveProperty("email", newEmail);
    expect(userData).toHaveProperty("password", "newpassword123");

    // Update variables for future tests
    email = newEmail;
    password = "newpassword123";
    await refreshAuthToken(email, password); // Refresh the token
  });

  it("User's name can be updated with a valid authorization token", async () => {
    const patchResponse = await request(baseURL)
      .patch("/users")
      .set("Authorization", token) // Use current valid token
      .send({ name: "Updated Name Only" });

    console.log("PATCH Response - Name Updated:", patchResponse.body);

    expect(patchResponse.status).toBe(200);
    const userData = patchResponse.body.data;
    expect(userData).toHaveProperty("name", "Updated Name Only");
  });

  it("User's email can be updated with a valid authorization token", async () => {
    const newEmail = generateUniqueEmail();

    const patchResponse = await request(baseURL)
      .patch("/users")
      .set("Authorization", token)
      .send({ email: newEmail });

    console.log("PATCH Response - Email Updated:", patchResponse.body);

    expect(patchResponse.status).toBe(200);
    const userData = patchResponse.body.data;
    expect(userData).toHaveProperty("email", newEmail);

    email = newEmail; // Update email for future tests
  });

  it("User cannot be updated when the authorization token is left empty", async () => {
    const patchResponse = await request(baseURL)
      .patch("/users")
      .set("Authorization", "") // Empty token
      .send({ name: "Empty Token User" });

    console.log("PATCH Response - Empty Token:", patchResponse.body);

    expect(patchResponse.status).toBe(403);
    expect(patchResponse.body).toHaveProperty(
      "message",
      "jwt must be provided"
    );
  });

  it("User cannot be updated with an invalid authorization token", async () => {
    const invalidToken = "invalid.token.string";

    const patchResponse = await request(baseURL)
      .patch("/users")
      .set("Authorization", invalidToken) // Invalid token
      .send({ name: "Invalid Token User" });

    console.log("PATCH Response - Invalid Token:", patchResponse.body);

    expect(patchResponse.status).toBe(403);
    expect(patchResponse.body).toHaveProperty("message", "invalid token");
  });

  it("User cannot be updated with an invalid signature token", async () => {
    const tamperedToken = token.slice(0, -1); // Remove last character

    console.log(`Tampered Token: ${tamperedToken}`);

    const patchResponse = await request(baseURL)
      .patch("/users")
      .set("Authorization", tamperedToken) // Use tampered token
      .send({ name: "Invalid Signature User" });

    console.log("PATCH Response - Tampered Token:", patchResponse.body);

    expect(patchResponse.status).toBe(403);
    expect(patchResponse.body).toHaveProperty("message", "invalid signature");
  });
});
