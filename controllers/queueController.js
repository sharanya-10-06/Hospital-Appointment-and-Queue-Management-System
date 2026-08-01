const pool = require("../config/db");

// View Queue
const getQueueByDoctor = async (req, res) => {
    try {

        const { doctorId } = req.params;

        const result = await pool.query(
            `SELECT
                a.appointment_id,
                a.queue_number,
                a.status,
                a.appointment_date,
                a.appointment_time,
                p.patient_id,
                p.name AS patient_name
             FROM appointments a
             JOIN patients p
             ON a.patient_id = p.patient_id
             WHERE a.doctor_id = $1
             ORDER BY a.queue_number`,
            [doctorId]
        );

        res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Get Next Patient
const getNextPatient = async (req, res) => {
    try {

        const { doctorId } = req.params;

        const result = await pool.query(
            `SELECT
                a.appointment_id,
                a.queue_number,
                a.status,
                p.name AS patient_name
             FROM appointments a
             JOIN patients p
             ON a.patient_id = p.patient_id
             WHERE a.doctor_id = $1
             AND a.status = 'Waiting'
             ORDER BY a.queue_number
             LIMIT 1`,
            [doctorId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "No Waiting Patients"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Start Consultation
const startConsultation = async (req, res) => {
    try {

        const { appointmentId } = req.params;

        const result = await pool.query(
            `UPDATE appointments
             SET status = 'In Progress'
             WHERE appointment_id = $1
             RETURNING *`,
            [appointmentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Appointment Not Found"
            });
        }

        res.status(200).json({
            message: "Consultation Started",
            appointment: result.rows[0]
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Complete Consultation
const completeConsultation = async (req, res) => {
    try {

        const { appointmentId } = req.params;

        const result = await pool.query(
            `UPDATE appointments
             SET status = 'Completed'
             WHERE appointment_id = $1
             RETURNING *`,
            [appointmentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Appointment Not Found"
            });
        }

        res.status(200).json({
            message: "Consultation Completed",
            appointment: result.rows[0]
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

module.exports = {
    getQueueByDoctor,
    getNextPatient,
    startConsultation,
    completeConsultation
};