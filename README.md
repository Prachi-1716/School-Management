# 🏫 ProxiSchools – Internshala Assignment

A RESTful Node.js backend application to:

- ✅ Add a new school (with address & geolocation)
- ✅ List all schools sorted by distance from the user's location

---

## 🧰 Tech Stack

- **Backend**: Node.js + Express
- **Database**: MySQL
- **Templating Engine**: EJS (for simple UI)
- **Distance Calculation**: Haversine formula (for real-world geolocation)

---

## 📦 Features

- Add a school with `name`, `address`, `latitude`, `longitude`
- Retrieve list of all schools, **sorted by proximity** to user location
- Input validation on both frontend and backend
- JSON support (for Postman testing)
- Basic EJS-based HTML forms for testing via browser

---

## 🚀 API Endpoints

### ➕ `POST /addSchool`

Add a new school to the database.

- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "name": "ABC School",
  "address": "Mumbai",
  "latitude": 19.076,
  "longitude": 72.8777
}
Success Response:

json
Copy
Edit
{
  "message": "School added successfully"
}

### GET /listSchools
Returns a list of schools sorted by distance from user-provided coordinates.

Query Parameters:

/listSchools?latitude=19.076&longitude=72.8777
Success Response (example):

json
[
  {
    "id": "a1b2c3...",
    "name": "ABC School",
    "address": "Mumbai",
    "latitude": 19.076,
    "longitude": 72.8777,
    "distance": 0.00
  },
  ...
]
🧪 Postman Collection
The API can be tested using Postman. The collection includes both endpoints.

📂 Project Structure
java
Copy
Edit
ProxiSchools/
│
├── views/              → EJS Templates (UI)
├── public/             → Static files (if any)
├── calculateDist.js    → Haversine distance function (optional helper)
├── index.js            → Main Express server + routing
└── README.md           → Project info (this file)
💻 How to Run Locally

1. Clone the repo (or unzip the folder)
git clone https://github.com/your-username/ProxiSchools.git
cd ProxiSchools

2. Install dependencies
npm install

3. Set up MySQL Database
Create a DB: schools

Create a table:

sql
CREATE TABLE schools (
  id VARCHAR(200) PRIMARY KEY,
  name VARCHAR(200),
  address VARCHAR(200),
  latitude DOUBLE,
  longitude DOUBLE
);

4. Update DB Credentials in index.js
js
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'schools'
});

5. Start the server
node index.js


🌐 Optional Frontend
GET /schools/new → Add a school via form

GET /schools/info → Info/help page (optional)

GET /schools?latitude=...&longitude=... → View sorted list via browser