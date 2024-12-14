const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

/* ---JSDoc format--- */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Created booking.
 */
router.post("/", bookingController.createBooking);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     responses:
 *       200:
 *         description: List of bookings.
 */
router.get("/", bookingController.getAllBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details.
 */
router.get("/:id", bookingController.getBookingById);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted.
 */
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
