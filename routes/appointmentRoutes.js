const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

// Book Appointment
router.post("/", appointmentController.bookAppointment);

// Get All Appointments
router.get("/", appointmentController.getAppointments);

// Get Appointment By ID
router.get("/:id", appointmentController.getAppointmentById);

// Update Appointment
router.put("/:id", appointmentController.updateAppointment);

// Delete Appointment
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;