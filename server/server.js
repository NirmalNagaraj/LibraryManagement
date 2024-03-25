const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 

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

app.post('/api/userdetails', (req, res) => {
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
app.get('/api/bookslist', (req, res) => {
  // Construct SQL query to fetch all books from the database
  const query = 'SELECT * FROM Books';

  // Execute the query to fetch books from the database
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Send the fetched books as a response
    res.json(results);
  });
});

app.post('/api/deleteBooks', (req, res) => {
  const { name } = req.body;

 
  const query = 'DELETE FROM Books WHERE BookName = ?';

  // Execute the query
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
