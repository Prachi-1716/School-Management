require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;

// Create the connection to database

require('dotenv').config();
const mysql = require('mysql2');

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'schools',
    port: process.env.DB_PORT || 3306,
    connectTimeout: 10000
  });

  connection.connect((err) => {
    if (err) {
      console.error('❌ Error connecting to DB:', err.message);
      setTimeout(handleDisconnect, 5000); // Retry after 5 sec
    } else {
      console.log('✅ Connected to MySQL database');
    }
  });

  connection.on('error', (err) => {
    console.error('❗ DB error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.fatal) {
      handleDisconnect(); // Reconnect on disconnect
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log("listing from port 3000");
});

// home route
app.get("/", (req, res) => {
    res.render("home");
});

//sends an form for getting school info
app.get("/schools/new", (req, res) => {
    res.render("new");
});

//saves the data into database
app.post("/schools", (req, res) => {
    let id = uuidv4();
    let { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid or missing input" });
    }

    let q = "INSERT INTO schools(id, name, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)";

    connection.query(q, [id, name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        else {
                return res.redirect("/");
            }

    });
});


//serve a form for user input ---> latitude and longitude
app.get("/schools/info", (req, res) => {
    res.render("info");
});

// sort and enlist schools based on the user's location
app.get("/schools", (req, res) => {
    let { latitude: userLat, longitude: userLng } = req.query;
    const q = `SELECT *, (6371 * 2 * ASIN(SQRT(POWER(SIN((RADIANS(?) - RADIANS(latitude)) / 2), 2) + COS(RADIANS(?)) * COS(RADIANS(latitude)) * POWER(SIN((RADIANS(?) - RADIANS(longitude)) / 2), 2)))) AS distance FROM schools ORDER BY distance ASC`;

    connection.query(q, [userLat, userLat, userLng], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        else {
            res.render("schools", { schools: result });
        }
    });
});

// for api testing through postman

// /addSchool
app.post("/addSchool", (req, res) => {
    let id = uuidv4();
    let { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid or missing input" });
    }

    let q = "INSERT INTO schools(id, name, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)";
    connection.query(q, [id, name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        else {
            return res.status(201).json({ message: "School added successfully" });
        }
    });
});

//   /listSchools
app.get("/listSchools", (req, res) => {
    let { latitude: userLat, longitude: userLng } = req.query;
    const q = `SELECT *, (6371 * 2 * ASIN(SQRT(POWER(SIN((RADIANS(?) - RADIANS(latitude)) / 2), 2) + COS(RADIANS(?)) * COS(RADIANS(latitude)) * POWER(SIN((RADIANS(?) - RADIANS(longitude)) / 2), 2)))) AS distance FROM schools ORDER BY distance ASC`;

    connection.query(q, [userLat, userLat, userLng], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        else {
            return res.status(200).json({result});
        }
    });
});
