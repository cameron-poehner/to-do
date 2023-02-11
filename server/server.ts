require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT ?? 8000;
const dbPool = require('./db');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params;

    try {
        const todos = await dbPool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err);
    }
});

app.post('/todos', async (req, res) => {
    const id = uuidv4();
    const {
        user_email,
        title,
        progress,
        date
    } = req.body;
    console.log('Request body', req.body);
    try {
        const newToDo = await dbPool.query(`Insert INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
            [id, user_email, title, progress, date]);
        res.json(newToDo);
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`Example running on port ${PORT}`);
})