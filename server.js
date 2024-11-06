const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sprinkle3#',
    database: 'your_database'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/get_lectures', (req, res) => {
    const query = 'SELECT * FROM lectures';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching lectures: ', err);
            return res.status(500).send('Error fetching lectures');
        }
        res.json({ data: results });
    });
});

app.post('/add_lecture', (req, res) => {
    const { lecture, content, address } = req.body;
    const query = 'INSERT INTO lectures (lecture, content, address) VALUES (?, ?, ?)';
    db.query(query, [lecture, content, address], (err, result) => {
        if (err) {
            console.error('Error adding lecture:', err);
            return res.status(500).send('Error adding lecture');
        }
        res.send('Lecture added successfully');
    });
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server running at 172.31.105.235:${port}`);
});
