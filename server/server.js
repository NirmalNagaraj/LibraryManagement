const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Beelzebub03',
  database: 'Library'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.use(cookieParser());

app.post('/api/studentLogin', (req, res) => {
  const { registerNumber, password } = req.body;

  const query = 'SELECT * FROM studentdetails WHERE RegisterNumber = ? AND Password = ?';
  connection.query(query, [registerNumber, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      // If authentication is successful, generate JWT
      const token = jwt.sign({ registerNumber, role: 'student' }, 'your_secret_key');

      // Set the JWT as a cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours expiry
      });

      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid register number or password' });
    }
  });
});

app.post('/api/adminLogin', (req, res) => {
  const { registerNumber, password } = req.body;

  const query = 'SELECT * FROM User_details WHERE RegisterNumber = ? AND Password = ?';
  connection.query(query, [registerNumber, password], (error, results) => {
    if (error) {
      console.error('Error querying MySQL: ', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 1) {
      // If authentication is successful, generate JWT
      const token = jwt.sign({ registerNumber, role: 'admin' }, 'your_secret_key');

      // Set the JWT as a cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours expiry
      });

      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid register number or password' });
    }
  });
});



app.get('/api/bookslist', (req, res) => {
  const query = 'SELECT * FROM Books';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(results);
  });
});

app.post('/api/deleteBooks', (req, res) => {
  const { name } = req.body;

  const query = 'DELETE FROM Books WHERE BookName = ?';

  connection.query(query, [name], (error, results) => {
    if (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ success: false, message: 'Failed to delete book' });
    } else {
      if (results.affectedRows === 1) {
        res.json({ success: true, message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Book not found' });
      }
    }
  });
});

app.post('/api/search', (req, res) => {
  const { searchText, selectedFilter } = req.body;

  let tableName, searchField;
  if (selectedFilter === 'Students') {
    tableName = 'User_details';
    searchField = 'Name';
  } else if (selectedFilter === 'Books') {
    tableName = 'Books';
    searchField = 'BookName';
  } else {
    res.status(400).json({ error: 'Invalid selected filter' });
    return;
  }

  const query = `SELECT * FROM ${tableName} WHERE ${searchField} LIKE '%${searchText}%'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(results);
  });
});

app.get('/api/borrowbooks', verifyToken, (req, res) => {
  // Extract the token from the request cookie
  const token = req.cookies.token;

  // Verify the token and extract the RegisterNumber
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    // Extract RegisterNumber from decoded token
    const { RegisterNumber } = decoded;

    // Query the BorrowList table based on RegisterNumber
    const query = 'SELECT * FROM BorrowList WHERE RegisterNumber = ?';

    connection.query(query, [RegisterNumber], (error, results) => {
      if (error) {
        console.error('Error querying BorrowList:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Send the fetched data as a response
      res.json(results);
    });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 