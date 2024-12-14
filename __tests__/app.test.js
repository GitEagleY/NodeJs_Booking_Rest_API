const request = require("supertest");
const app = require("../src/app");
const db = require("../src/db");

beforeAll((done) => {
  db.serialize(() => {
    db.run("DELETE FROM bookings", done); // Clean database before tests
  });
});

describe("Booking API Endpoints", () => {
  let bookingId;

  it("should create a booking", async () => {
    const res = await request(app).post("/bookings").send({
      user: "John Doe",
      date: "2024-12-11",
      startTime: "10:00",
      endTime: "11:30",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    bookingId = res.body.id; // Save ID for later tests
  });

  it("should return all bookings", async () => {
    const res = await request(app).get("/bookings");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should return a booking by ID", async () => {
    const res = await request(app).get(`/bookings/${bookingId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", bookingId);
  });

  it("should delete a booking by ID", async () => {
    const res = await request(app).delete(`/bookings/${bookingId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Booking deleted");
  });

  it("should return 404 for non-existent booking ID", async () => {
    const res = await request(app).get("/bookings/non-existent-id");
    expect(res.statusCode).toEqual(404);
  });
});
