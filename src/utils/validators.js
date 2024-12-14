const Joi = require("joi");

const bookingSchema = Joi.object({
  user: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  startTime: Joi.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/) //24-hour format (HH:MM), where HH is 00-23 and MM is 00-59

    .required()
    .messages({
      "string.pattern.base": "startTime must be in HH:mm format (00:00–23:59).",
    }),
  endTime: Joi.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/) //24-hour format (HH:MM), where HH is 00-23 and MM is 00-59

    .required()
    .messages({
      "string.pattern.base": "endTime must be in HH:mm format (00:00–23:59).",
    }),
});

exports.validateBooking = (data) => bookingSchema.validate(data); //check with schema if data is correct

exports.findConflicts = (db, date, startTime, endTime, callback) => {
  db.all(
    `SELECT * FROM bookings WHERE date = ? AND (
      (? >= startTime AND ? < endTime) OR
      (? > startTime AND ? <= endTime) OR
      (? <= startTime AND ? >= endTime)
    )`,
    [date, startTime, startTime, endTime, endTime, startTime, endTime],
    callback
  );
};
