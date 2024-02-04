const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "elysium",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

app.get("/api/", (req, res) => {
  res.status(200).send("Connection To Server Successfull");
});

app.get("/api/Statistics/:monthyear", (req, res) => {
  const monthyear = req.params.monthyear;
  const sqlquery =
    "SELECT * FROM dailyrent WHERE DATE_FORMAT(date, '%Y-%m') = '" +
    monthyear +
    "';";

  console.log(sqlquery);

  connection.query(sqlquery, (err, results) => {
    if (err) {
      res.status(400).send("Error Running Query");
    } else {
      res.status(300).send(results);
    }
  });
});

app.get("/api/Installments", (req, res) => {
  const sqlquery = "SELECT * FROM installments";
  connection.query(sqlquery, (err, results) => {
    if (err) {
      res.status(400).send("Error Fetching Installments");
    } else {
      res.status(200).send(results);
    }
  });
});

app.get("/api/Expenses/:monthyear", (req, res) => {
  const monthyear = req.params.monthyear;

  const sqlquery =
    "SELECT * FROM expenses WHERE DATE_FORMAT(date, '%Y-%m') = '" +
    monthyear +
    "';";

  connection.query(sqlquery, (err, results) => {
    if (err) {
      res.status(400).send("Error Running Query");
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
