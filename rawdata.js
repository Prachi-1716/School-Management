const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');
const schools = [
  {
    name: "Delhi Public School",
    address: "RK Puram, New Delhi",
    latitude: 28.5672,
    longitude: 77.2100
  },
  {
    name: "St. Xavier's High School",
    address: "Fort, Mumbai, Maharashtra",
    latitude: 18.9320,
    longitude: 72.8311
  },
  {
    name: "Bishop Cotton Boys' School",
    address: "St Mark's Rd, Bengaluru, Karnataka",
    latitude: 12.9716,
    longitude: 77.5946
  },
  {
    name: "La Martiniere College",
    address: "Lucknow, Uttar Pradesh",
    latitude: 26.8467,
    longitude: 80.9462
  },
  {
    name: "DAV Public School",
    address: "Salt Lake, Kolkata, West Bengal",
    latitude: 22.5726,
    longitude: 88.3639
  },
  {
    name: "SBOA School & Junior College",
    address: "Anna Nagar, Chennai, Tamil Nadu",
    latitude: 13.0827,
    longitude: 80.2707
  },
  {
    name: "Loyola High School",
    address: "Patna, Bihar",
    latitude: 25.5941,
    longitude: 85.1376
  },
  {
    name: "Nirmala Convent School",
    address: "Gorakhpur, Uttar Pradesh",
    latitude: 26.7606,
    longitude: 83.3732
  },
  {
    name: "Jawahar Navodaya Vidyalaya",
    address: "Ajmer, Rajasthan",
    latitude: 26.4499,
    longitude: 74.6399
  },
  {
    name: "Kendriya Vidyalaya",
    address: "Ernakulam, Kerala",
    latitude: 9.9312,
    longitude: 76.2673
  }
];

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'schools',
  password: 'Prachi@1716'
});

for(let school of schools){
    school.id = uuidv4();
    let q = "INSERT INTO schools(id, name, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)";
    connection.query(q, [school.id, school.name, school.address, school.latitude, school.longitude], (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });
}