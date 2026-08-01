Hospital Appointment and Queue Management System

1. Project Description

The Hospital Appointment and Queue Management System is a backend application developed using Node.js, Express.js, and PostgreSQL. It manages patients, doctors, appointments, and consultation queues through REST APIs.

2. Problem Statement

Hospitals often face challenges in managing patient appointments and consultation queues manually, leading to longer waiting times and scheduling issues. This project provides a backend solution to automate appointment booking, queue generation, and consultation management.

3. Features Implemented

- Patient Registration
- Doctor Management (CRUD Operations)
- Appointment Management (CRUD Operations)
- Automatic Queue Number Generation
- View Current Queue
- Start Consultation
- Complete Consultation
- PostgreSQL Database Integration
- REST API Development using Express.js

4. Technologies Used

- Node.js
- Express.js
- PostgreSQL
- JavaScript
- Postman
- bcrypt (Password Hashing)

Note:
The project includes the JWT (`jsonwebtoken`) package and the basic authentication structure (`authController`, `authRoutes`, and `authMiddleware`). However, JWT-based route protection has not been fully implemented in the current version. It is planned as a future enhancement.

5. Project Structure

config/
controllers/
middleware/
routes/
server.js
package.json

6. API Modules

a. Patient Module
- Register Patient

b. Doctor Module
- Add Doctor
- View All Doctors
- View Doctor by ID
- Update Doctor
- Delete Doctor

c. Appointment Module
- Book Appointment
- View All Appointments
- View Appointment by ID
- Update Appointment Status
- Delete Appointment

d. Queue Management Module
- View Queue
- Start Consultation
- Complete Consultation

7. Database

PostgreSQL is used to store:
- Patients
- Doctors
- Appointments

Relationships between tables are maintained using foreign keys.

8. How to Run

a. Clone the repository.
b. Install dependencies.
   
npm install

c. Configure PostgreSQL.
d. Create a `.env` file with database credentials.
e. Start the server.

npm run dev

f. Test APIs using Postman.

9. Future Enhancements

- Complete JWT Authentication
- Protect APIs using Authentication Middleware
- Input Validation
- Duplicate Record Checking
- Admin Dashboard
- Email/SMS Notifications
- Appointment Cancellation
- Search and Filter APIs
