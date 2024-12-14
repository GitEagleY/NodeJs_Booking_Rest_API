const db = require("../src/db");

describe("Database", () => {
  beforeAll((done) => {
    db.serialize(() => {
      db.run("DELETE FROM bookings", done); // Clean database before tests
    });
  });

  it("should insert and retrieve a booking", (done) => {
    db.run(
      `INSERT INTO bookings (id, user, date, startTime, endTime) VALUES (?, ?, ?, ?, ?)`,
      ["test-id", "Jane Doe", "2024-12-11", "10:00", "11:30"],
      (err) => {
        expect(err).toBeNull();

        db.get(
          "SELECT * FROM bookings WHERE id = ?",
          ["test-id"],
          (err, row) => {
            expect(err).toBeNull();
            expect(row).toHaveProperty("user", "Jane Doe");
            done();
          }
        );
      }
    );
  });
});
