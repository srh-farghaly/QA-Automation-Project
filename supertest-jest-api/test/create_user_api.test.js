const request = require("supertest");
const baseURL = "http://localhost:3000/api/v1";

// Helper function to generate unique strings (for names, emails, passwords)
function generateUniqueValue(prefix = "value") {
  const timestamp = Date.now();
  return `${prefix}-${timestamp}`;
}

describe("POST /users - Create User", () => {
  it("Verify that a user can be created successfully.", async () => {
    const email = generateUniqueValue("validUser@gmail.com");
    const name = generateUniqueValue("ValidUser");
    const password = generateUniqueValue("password");

    const response = await request(baseURL).post("/users").send({
      name: name,
      email: email,
      password: password,
    });

    console.log("User Creation Response:", response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "User registered with success"
    );
    expect(response.body).toHaveProperty("token");
  });

  it("Verify that user creation fails when password is missing.", async () => {
    const email = generateUniqueValue("missingPasswordUser@gmail.com");
    const name = generateUniqueValue("MissingPasswordUser");

    const response = await request(baseURL).post("/users").send({
      name: name,
      email: email, // Valid email but no password
    });

    console.log("Response Status:", response.status);
    console.log(
      "Missing Password Response:",
      JSON.stringify(response.body, null, 2)
    );

    expect(response.status).toBe(400); // Expected: 400 Bad Request
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  it("Verify that user creation fails when email is missing.", async () => {
    const name = generateUniqueValue("MissingEmailUser");
    const password = generateUniqueValue("userPassword");

    const response = await request(baseURL).post("/users").send({
      name: name,
      password: password, // Valid password but no email
    });

    console.log("Missing Email Response:", response.body);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("Verify that duplicate user creation returns 'User already registered' with status 401.", async () => {
    const email = generateUniqueValue("duplicateUser@gmail.com");
    const name = generateUniqueValue("DuplicateUser");
    const password = generateUniqueValue("userPassword");

    // Register the user initially
    await request(baseURL).post("/users").send({
      name: name,
      email: email,
      password: password,
    });

    // Attempt to register the same user again
    const response = await request(baseURL).post("/users").send({
      name: name,
      email: email, // Same email to simulate duplicate registration
      password: password,
    });

    console.log("Duplicate User Response:", response.body);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "User already registered");
    expect(response.body).not.toHaveProperty("token");
  });

  it("Verify that a user can be created without a name.", async () => {
    const email = generateUniqueValue("nonameUser@gmail.com");
    const password = generateUniqueValue("password");

    const response = await request(baseURL).post("/users").send({
      email: email,
      password: password,
    });

    console.log("Response without Name:", response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "User registered with success"
    );
    expect(response.body).toHaveProperty("token");
  });
});
