const request = require("supertest");
const app = require("../your-express-app"); // Replace this with the path to your Express app file
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { generateAccessToken } = require("../middleware/auth");

// Mock PrismaClient
jest.mock("@prisma/client");
const mockPrismaClient = new PrismaClient();

// Mock bcrypt compare
jest.mock("bcrypt");

// Mock jwt sign
jest.mock("jsonwebtoken");

describe("Authentication Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log in super admin successfully", async () => {
    // Mock PrismaClient admin.findUnique
    mockPrismaClient.admin.findUnique.mockResolvedValueOnce({
      id: 1,
      email: "superadmin@example.com",
      password: "hashedPassword",
    });

    // Mock bcrypt compare
    bcrypt.compare.mockResolvedValueOnce(true);

    // Mock jwt sign
    jwt.sign.mockReturnValueOnce("fakeRefreshToken");

    // Mock generateAccessToken
    generateAccessToken.mockReturnValueOnce("fakeAccessToken");

    const response = await request(app)
      .post("/login/superadmin")
      .send({ email: "superadmin@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Admin logged in successfully");
    expect(response.body.accessToken).toBe("fakeAccessToken");
    expect(response.body.refreshToken).toBe("fakeRefreshToken");
  });

  // Write similar tests for other login scenarios
});
