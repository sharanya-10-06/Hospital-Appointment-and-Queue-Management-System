const express = require("express");
const router = express.Router();

const queueController = require("../controllers/queueController");

// View Queue
router.get("/:doctorId", queueController.getQueueByDoctor);

// Get Next Patient
router.get("/:doctorId/next", queueController.getNextPatient);

// Start Consultation
router.put("/:appointmentId/start", queueController.startConsultation);

// Complete Consultation
router.put("/:appointmentId/complete", queueController.completeConsultation);

module.exports = router;