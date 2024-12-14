const { validateBooking, findConflicts } = require("../utils/validators");

const db = require("../db");
const { v4: uuidv4 } = require("uuid"); //?

exports.createBooking = (req, res) => {
  const { error, value } = validateBooking(req.body); // assign the properties
  if (error) {
    //Bad Request
    return res.status(400).json({ error: error.details[0].message });
  }

  const { user, date, startTime, endTime } = value; //destructuring

  if (startTime >= endTime) {
    return res.status(400).json({
      //Bad Request
      error: `'startTime' (${startTime}) must be earlier than 'endTime' (${endTime}).`,
    });
  }

  //call on conflicts
  findConflicts(db, date, startTime, endTime, (conflictError, conflicts) => {
    if (conflictError) return res.status(500).json({ error: "Database error" });
    if (conflicts.length > 0) {
      return res
        .status(409) //Conflict error
        .json({ error: "Booking conflict: time slot unavailable." });
    }
    //no errors, proceed to create the booking
    const id = uuidv4(); // Generate a unique ID for the new booking
    db.run(
      `INSERT INTO bookings (id, user, date, startTime, endTime) VALUES (?, ?, ?, ?, ?)`,
      [id, user, date, startTime, endTime],
      //callback
      (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ id, user, date, startTime, endTime });
      }
    );
  });
};

exports.getAllBookings = (req, res) => {
  db.all("SELECT * FROM bookings", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
};

exports.getBookingById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM bookings WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!row) return res.status(404).json({ error: "Booking not found" });
    res.json(row);
  });
};

exports.deleteBooking = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM bookings WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: "Database error" });
    if (this.changes === 0)
      return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted" });
  });
};
