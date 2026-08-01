const pool = require("../config/db");

// Book Appointment
const bookAppointment = async (req, res) => {
    try {

        const {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time
        } = req.body;

        // Generate Queue Number
        const queueResult = await pool.query(
            `SELECT COUNT(*) FROM appointments
             WHERE doctor_id = $1
             AND appointment_date = $2`,
            [doctor_id, appointment_date]
        );

        const queue_number =
            parseInt(queueResult.rows[0].count) + 1;

        const result = await pool.query(
            `INSERT INTO appointments
            (patient_id, doctor_id, appointment_date, appointment_time, queue_number)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *`,
            [
                patient_id,
                doctor_id,
                appointment_date,
                appointment_time,
                queue_number
            ]
        );

        res.status(201).json({
            message: "Appointment Booked Successfully",
            appointment: result.rows[0]
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Get All Appointments
const getAppointments = async (req, res) => {

    try {

        const result = await pool.query(`
        SELECT
        a.*,
        p.name AS patient_name,
        d.name AS doctor_name,
        d.specialization

        FROM appointments a
        JOIN patients p
        ON a.patient_id = p.patient_id

        JOIN doctors d
        ON a.doctor_id = d.doctor_id

        ORDER BY appointment_date,
        appointment_time
        `);

        res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Appointment By ID
const getAppointmentById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT * FROM appointments
             WHERE appointment_id=$1`,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Appointment Not Found"
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

// Update Appointment
const updateAppointment = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        const result = await pool.query(
            `UPDATE appointments
             SET status=$1
             WHERE appointment_id=$2
             RETURNING *`,
            [status, id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Appointment Not Found"
            });

        }

        res.status(200).json({
            message: "Appointment Updated Successfully",
            appointment: result.rows[0]
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Delete Appointment
const deleteAppointment = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM appointments
             WHERE appointment_id=$1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Appointment Not Found"
            });

        }

        res.status(200).json({
            message: "Appointment Deleted Successfully",
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
    bookAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};