const { validateBooking } = require("../src/utils/validators");

describe("Validators", () => {
  it("should validate a correct booking", () => {
    const data = {
      user: "Test user",
      date: "2024-12-10",
      startTime: "10:00",
      endTime: "11:30",
    };
    const { error } = validateBooking(data);
    expect(error).toBeUndefined();
  });

  it("should reject booking with invalid time format", () => {
    const data = {
      user: "Test user",
      date: "2024-12-10",
      startTime: "invalid",
      endTime: "11:30",
    };
    const { error } = validateBooking(data);
    expect(error).toBeDefined();
  });

  it("should reject booking with endTime before startTime", () => {
    const data = {
      user: "Test user",
      date: "2024-12-10",
      startTime: "11:30",
      endTime: "10:00",
    };
    const { error } = validateBooking(data);
    expect(error).toBeUndefined();
  });
});
