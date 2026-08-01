const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");

// Create Doctor
router.post("/", doctorController.addDoctor);

// Get All Doctors
router.get("/", doctorController.getDoctors);

// Get Doctor By ID
router.get("/:id", doctorController.getDoctorById);

// Update Doctor
router.put("/:id", doctorController.updateDoctor);

// Delete Doctor
router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;