import "jest";
import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import UserSchema from "../src/schema/user.schema";
import bcrypt from "bcrypt";

const TEST_DB_URI = "mongodb://localhost:27017/fake_so";

describe("User Routes", () => {
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_URI); // Replace with your MongoDB URI
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await UserSchema.deleteMany({});
  });

  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const user = new UserSchema({
        email: "test@example.com",
        username: "testuser",
        password: await bcrypt.hash("password", 10),
      });
      await user.save();

      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].email).toBe("test@example.com");
      expect(response.body[0].username).toBe("testuser");
      expect(response.body[0]).not.toHaveProperty("password");
    });
  });
  describe("GET /api/users/:id", () => {
    it("should return a specific user", async () => {
      const user = new UserSchema({
        email: "test@example.com",
        username: "testuser",
        password: await bcrypt.hash("password", 10),
      });
      const savedUser = await user.save();

      const response = await request(app).get(`/api/users/${savedUser._id}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe("test@example.com");
      expect(response.body.username).toBe("testuser");
      expect(response.body).not.toHaveProperty("password");
    });

    it("should return 400 if id is not proper format", async () => {
      const response = await request(app).get("/api/users/invalidid");

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid id");
    });

    it("should return 404 if user not found", async () => {
      const response = await request(app).get(
        "/api/users/aaaaaaaaaaaaaaaaaaaaaaaa",
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });
});
