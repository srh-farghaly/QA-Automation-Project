const request = require("supertest");
const baseURL = "http://localhost:3000/api/v1";

// Helper to generate a unique email
function generateUniqueEmail() {
  const timestamp = Date.now();
  return `user-${timestamp}@gmail.com`;
}

describe("POST /auth - Authenticate User", () => {
  let testEmail = generateUniqueEmail(); // Generate unique email
  let testPassword = "password123"; // Default password
  let userToken; // Store token

  // Create a user before running the authentication tests
  beforeAll(async () => {
    const createUserResponse = await request(baseURL).post("/users").send({
      name: "Test User",
      email: testEmail,
      password: testPassword,
    });

    console.log("User Created:", createUserResponse.body);
    expect(createUserResponse.status).toBe(200);
  });

  it("Verify that a newly created user can authenticate and receive a token", async () => {
    const authResponse = await request(baseURL).post("/auth").send({
      email: testEmail, // Use the generated email
      password: testPassword, // Use the same password
    });

    console.log("Token Response:", authResponse.body); // Log response to verify
    expect(authResponse.status).toBe(200);
    expect(authResponse.body).toHaveProperty("token");

    userToken = authResponse.body.token; // Store the token for future use
  });

  it("Verify that invalid credentials do not authenticate the user", async () => {
    const authResponse = await request(baseURL).post("/auth").send({
      email: testEmail, // Valid email
      password: "wrongPassword", // Invalid password
    });

    console.log("Invalid Token Response:", authResponse.body);

    expect(authResponse.status).toBe(401); // Unauthorized status code
    expect(authResponse.body).toHaveProperty(
      "message",
      "Incorrect email or password"
    );
    expect(authResponse.body).not.toHaveProperty("token");
  });

  // Optional cleanup: delete the test user after the tests
  afterAll(async () => {
    const deleteResponse = await request(baseURL)
      .delete("/users")
      .set("Authorization", userToken); // Use the token to delete the user

    console.log("User Deleted:", deleteResponse.body);
    expect(deleteResponse.status).toBe(200);
  });
});
