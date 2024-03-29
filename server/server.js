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
app.use(cookieParser());

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
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid register number or password' });
    }
  });
});

app.post('/bookdetails', (req, res) => {
    const { bookName, bookAuthor, date, bookDescription, department } = req.body;

    const query = 'INSERT INTO Books (BookName, BookAuthor, PublishedDate, BookDescription, Department) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [bookName, bookAuthor, date, bookDescription, department], (error, results) => {
        if (error) {
            console.error('Error inserting book details:', error);
            res.status(500).json({ success: false, message: 'Failed to insert book details' });
        } else {
            res.json({ success: true, message: 'Book details inserted successfully' });
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

app.post('/api/borrowbooks', (req, res) => {
  // Extract data from request body
  const { registerNumber, fromDate, toDate, bookName } = req.body;

  // Query to insert data into BorrowList table
  const query = 'INSERT INTO BorrowList (RegisterNumber, FromDate, ToDate, BookName) VALUES (?, ?, ?, ?)';

  // Execute the query with data from request body
  connection.query(query, [registerNumber, fromDate, toDate, bookName], (error, results) => {
    if (error) {
      console.error('Error inserting data into BorrowList:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Data successfully inserted, send success response
    res.status(200).json({ success: true, message: 'Data inserted successfully' });
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 