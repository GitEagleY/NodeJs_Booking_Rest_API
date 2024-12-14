# Booking REST API

Backend service for managing a bookings. Provides a REST API for creating, retrieving, and deleting bookings, ensuring data validation, conflict prevention, and robust handling of edge cases.

---

## Instructions to Run the Project Locally

### Prerequisites:
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **SQLite explorer**(optional) 

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/GitEagleY/NodeJs_Booking_Rest_API.git
   cd NodeJs_Booking_Rest_API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```



3. Start the development server:
   ```bash
   node index.js
   ```
   The server will run on [http://localhost:3000](http://localhost:3000).

4. Access Swagger documentation at:
   [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

5. Run tests:
   ```bash
   npm test
   ```

6. Check coverage:
   ```bash
    npm test -- --coverage
   ```

   or navigate to ./coverage/lcov-report/index.html
---

## Features Implemented

1. **API Endpoints:**
   - **POST /bookings**: Create a booking (ensures no overlapping slots).
   - **GET /bookings**: Retrieve all bookings.
   - **GET /bookings/:id**: Retrieve a booking by ID.
   - **DELETE /bookings/:id**: Delete a booking.

2. **Data Validation:**
   - Validates request data using `Joi`.
   - Ensures `startTime` is earlier than `endTime` and within the same day.

3. **Conflict Handling:**
   - Checks for overlapping bookings on the same date and time range.

4. **Storage:**
   - Configured to use SQLite for persistence, with fallback to in-memory storage.

5. **Documentation:**
   - API endpoints documented using Swagger.

6. **Testing:**
   - Unit tests written with Jest.
   - Test coverage exceeds 80%.

---

## Libraries and Tools Used

1. **Express.js**: Framework for building the REST API.
   - Chosen for its simplicity and extensive ecosystem.
2. **Joi**: For schema validation of incoming requests.
   - Ensures robust data validation.
3. **SQLite**: For lightweight and portable database storage.
   - Provides persistence without requiring external services.
4. **Swagger (via `swagger-ui-express`)**: For API documentation.
   - Facilitates testing and understanding of endpoints.
5. **Jest**: Testing framework for unit tests.
   - Ensures code quality and reliability.


---

## Example Data for Swagger Testing

### Create a Booking (POST /bookings):
```json
{
  "user": "User",
  "date": "2024-10-10",
  "startTime": "10:00",
  "endTime": "12:00"
}
```
