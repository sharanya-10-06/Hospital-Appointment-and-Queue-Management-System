const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM patients WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        const patient = result.rows[0];

        const isMatch = await bcrypt.compare(password, patient.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                patient_id: patient.patient_id,
                email: patient.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        delete patient.password;

        res.json({
            message: "Login Successful",
            token,
            patient
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    login
};