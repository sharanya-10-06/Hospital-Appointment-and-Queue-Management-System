const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const queueRoutes = require("./routes/queueRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/queue", queueRoutes);

app.get("/", (req, res) => {
    res.send("Hospital Appointment Backend Running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});