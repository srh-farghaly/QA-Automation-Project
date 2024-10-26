const request = require("supertest");
const baseURL = "http://localhost:3000/api/v1";

describe("DELETE /all-users - Delete All Users with Admin Key", () => {
  const adminKey = "keyadmin123"; // Use the same key as tested in Postman

  it("Deletes all users successfully with a valid admin key", async () => {
    const deleteResponse = await request(baseURL)
      .delete("/all-users")
      .send({ key_admin: adminKey }); // Send admin key in the body

    console.log("DELETE Response:", deleteResponse.body);

    // Validate the response
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty(
      "message",
      "Users deleted with success"
    );
  });

  it("Users cannot be deleted when the admin key is left empty", async () => {
    const deleteResponse = await request(baseURL).delete("/all-users").send({}); // No admin key provided

    console.log("DELETE Response - Missing Key:", deleteResponse.body);

    // Validate the response
    expect(deleteResponse.status).toBe(403);
    expect(deleteResponse.body).toHaveProperty(
      "message",
      "Unauthorized access"
    );
  });

  it("Users Cannot be deleted when the admin key is invalid", async () => {
    const invalidKey = "invalidkey123";

    const deleteResponse = await request(baseURL)
      .delete("/all-users")
      .send({ key_admin: invalidKey });

    console.log("DELETE Response - Invalid Key:", deleteResponse.body);

    // Validate the response
    expect(deleteResponse.status).toBe(403);
    expect(deleteResponse.body).toHaveProperty(
      "message",
      "Unauthorized access"
    );
  });
});
