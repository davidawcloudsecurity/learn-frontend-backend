const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // for parsing application/json

// Connect to SQLite database
const db = new sqlite3.Database('todo.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the todo database.');
});

// Create the todos table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

// GET all todos
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;

  db.run('INSERT INTO todos (text) VALUES (?)', [text], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    db.get(`SELECT * FROM todos WHERE id = ${this.lastID}`, (err, row) => {
      res.json(row);
    });
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
