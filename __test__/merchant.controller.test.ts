import { createMerchant } from "../src/controllers/merchant.controller";

describe("createMerchant", () => {
  test("should create a new merchant", async () => {
    const req: any = {
      body: {
        name: "Test Merchant",
        email: "test@example.com",
        password: "password",
        shopName: "Test Shop",
        merchantType: "Retail",
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createMerchant(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.any(Object) })
    );
  });

  // Add more test cases for different scenarios (e.g., validation errors, duplicate emails, etc.)
});
