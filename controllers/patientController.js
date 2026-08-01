const pool = require("../config/db");
const bcrypt = require("bcrypt");

const registerPatient = async (req, res) => {

    try {

        const { name, email, password, phone, age, gender } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO patients
            (name, email, password, phone, age, gender)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [name, email, hashedPassword, phone, age, gender]
        );
        
const patient = result.rows[0];
delete patient.password;

res.status(201).json({
    message: "Patient Registered Successfully",
    patient
});

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    registerPatient
};