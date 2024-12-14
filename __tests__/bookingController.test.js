const bookingController = require("../src/controllers/bookingController");
const { validateBooking, findConflicts } = require("../src/utils/validators");
jest.mock("../src/utils/validators");
jest.mock("../src/db");

const db = require("../src/db");

describe("Booking Controller", () => {
  it("should return 400 for validation errors", () => {
    validateBooking.mockReturnValue({
      error: { details: [{ message: "Validation error" }] },
    });

    const req = { body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    bookingController.createBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Validation error" });
  });

  it("should return 400 if startTime is later than or equal to endTime", () => {
    validateBooking.mockReturnValue({
      error: undefined,
      value: {
        user: "Test",
        date: "2024-12-11",
        startTime: "12:00",
        endTime: "10:00",
      },
    });

    const req = {
      body: {
        user: "Test",
        date: "2024-12-11",
        startTime: "12:00",
        endTime: "10:00",
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    bookingController.createBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "'startTime' (12:00) must be earlier than 'endTime' (10:00).",
    });
  });

  it("should return 404 when trying to delete a non-existent booking", () => {
    const req = { params: { id: "non-existent-id" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    db.run.mockImplementation(function (query, params, callback) {
      this.changes = 0; // Simulate no rows affected
      callback.call(this, null); // Ensure `this` is correctly bound
    });

    bookingController.deleteBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Booking not found" });
  });
});
