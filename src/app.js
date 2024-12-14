const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", //oas ver
    info: {
      title: "✅Booking API✅",
      version: "1.0.0",
      description: "API for managing bookings for something.",
    },
    components: {
      schemas: {
        Booking: {
          type: "object",
          properties: {
            user: { type: "string" },
            date: { type: "string", format: "date" },
            startTime: { type: "string", pattern: "^\\d{2}:\\d{2}$" },
            endTime: { type: "string", pattern: "^\\d{2}:\\d{2}$" },
          },
          required: ["user", "date", "startTime", "endTime"],
        },
      },
    },
  },
  apis: ["./src/routes/bookingRoutes.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/bookings", bookingRoutes);

module.exports = app;
