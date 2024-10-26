const request = require("supertest");
const baseURL = "http://localhost:3000/api/v1";

// Helper function to generate a unique email
function generateUniqueEmail() {
  const timestamp = Date.now();
  return `user-${timestamp}@gmail.com`;
}

describe("GET /users - Fetch User by Token", () => {
  let token; // Store the token for use in the GET request
  let testEmail = generateUniqueEmail(); // Generate a unique email
  let testPassword = "password123"; // Default password for the user

  beforeAll(async () => {
    // Step 1: Create a new user
    const createUserResponse = await request(baseURL).post("/users").send({
      name: "Test User",
      email: testEmail,
      password: testPassword,
    });

    console.log("User Created:", createUserResponse.body);
    expect(createUserResponse.status).toBe(200);

    // Step 2: Authenticate the new user to get a valid token
    const authResponse = await request(baseURL).post("/auth").send({
      email: testEmail,
      password: testPassword,
    });

    console.log("Auth Response Status:", authResponse.status);
    console.log("Auth Response Body:", authResponse.body);

    // Ensure token is received successfully
    expect(authResponse.status).toBe(200);
    expect(authResponse.body).toHaveProperty("token");

    // Store the token for subsequent requests
    token = authResponse.body.token;
    console.log(`Using Token: ${token}`);
  });

  it("Verify that the authenticated user can be fetched using a valid token", async () => {
    // Step 3: Send GET request with the token
    const getUserResponse = await request(baseURL)
      .get("/users")
      .set("Authorization", token); // Pass the token in the header

    console.log("GET Response Status:", getUserResponse.status);
    console.log("GET Response Body:", getUserResponse.body);

    // Validate the response
    expect(getUserResponse.status).toBe(200); // Ensure the status is 200 OK
    expect(getUserResponse.body).toHaveProperty("id");
    expect(getUserResponse.body).toHaveProperty("name", "Test User");
    expect(getUserResponse.body).toHaveProperty("email", testEmail);
    expect(getUserResponse.body).toHaveProperty("imageUrl"); // Ensure imageUrl is present
  });

  it("Verify that requests with an invalid token are rejected", async () => {
    // Step 4: Send GET request with the invalid token
    const getUserResponse = await request(baseURL)
      .get("/users")
      .set("Authorization", "i am invalid"); // Pass an invalid token

    console.log("GET Response Status:", getUserResponse.status);
    console.log("GET Response Body:", getUserResponse.body);

    // Validate the response
    expect(getUserResponse.status).toBe(403); // Ensure the status is 403 Forbidden
    expect(getUserResponse.body).toHaveProperty("message", "Unauthorized");
  });

  // Optional: Clean up by deleting the user after tests
  afterAll(async () => {
    const deleteResponse = await request(baseURL)
      .delete("/users")
      .set("Authorization", token); // Use the token to delete the user

    console.log("User Deleted:", deleteResponse.body);
    expect(deleteResponse.status).toBe(200);
  });
});
