const pool = require("../config/db");

// ======================
// Add Doctor
// ======================
const addDoctor = async (req, res) => {
    try {
        const { name, specialization, available } = req.body;

        const result = await pool.query(
            `INSERT INTO doctors (name, specialization, available)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, specialization, available]
        );

        res.status(201).json({
            message: "Doctor Added Successfully",
            doctor: result.rows[0]
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// ======================
// Get All Doctors
// ======================
const getDoctors = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM doctors ORDER BY doctor_id"
        );

        res.status(200).json(result.rows);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// ======================
// Get Doctor By ID
// ======================
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM doctors WHERE doctor_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Doctor not found"
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

// ======================
// Update Doctor
// ======================
const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, specialization, available } = req.body;

        const result = await pool.query(
            `UPDATE doctors
             SET name = $1,
                 specialization = $2,
                 available = $3
             WHERE doctor_id = $4
             RETURNING *`,
            [name, specialization, available, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            message: "Doctor Updated Successfully",
            doctor: result.rows[0]
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// ======================
// Delete Doctor
// ======================
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM doctors WHERE doctor_id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            message: "Doctor Deleted Successfully",
            doctor: result.rows[0]
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// ======================
// Export Functions
// ======================
module.exports = {
    addDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};