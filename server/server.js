const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cors middleware
app.use(cors());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Beelzebub03',
  database: 'Library'
});
 
// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
}); 

app.post('/api/userdetails', (req, res) => {
  const { registerNumber, password } = req.body;

  // Query to check if user exists with the given registerNumber and password
  const query = 'SELECT * FROM User_details WHERE RegisterNumber = ? AND Password = ?';
  
  // Execute the query
  connection.query(query, [registerNumber, password], (error, results) => {
    if (error) {
      console.error('Error querying MySQL: ', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    // Check if any user was found with the provided details
    if (results.length === 1) {
      // User found, return success response
      res.json({ success: true, message: 'Login successful' });
    } else {
      // User not found or details don't match, return error response
      res.status(401).json({ success: false, message: 'Invalid register number or password' });
    }
  }); 
});
app.post('/bookdetails', (req, res) => {
    // Retrieve data from the request body
    const { bookName, bookAuthor, date, bookDescription } = req.body;

    // Construct SQL query for inserting book details
    const query = 'INSERT INTO Books (BookName, BookAuthor, PublishedDate, BookDescription) VALUES (?, ?, ?, ?)';

    // Execute the query
    connection.query(query, [bookName, bookAuthor, date, bookDescription], (error, results) => {
        if (error) {
            console.error('Error inserting book details:', error);
            res.status(500).json({ success: false, message: 'Failed to insert book details' });
        } else {
            res.json({ success: true, message: 'Book details inserted successfully' });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
