require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT ?? 8000;
const dbPool = require('./db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { user_email, title, progress, date } = req.body;
    try {
        const editToDo = await dbPool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;',
            [user_email, title, progress, date, id]);
        res.json(editToDo);
    } catch (err) {
        console.error(err)
    }
});

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedToDo = await dbPool.query('DELETE FROM todos WHERE id = $1;', [id])
        res.json(deletedToDo);
    } catch (err) {
        console.error(err);
    }

});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.getSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const signUp = await dbPool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [email, hashedPassword])

        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })

        res.json({ email, token });
    } catch (err) {
        console.error(err);
        if (err) {
            res.json({ detail: err.detail })
        }
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`Example running on port ${PORT}`);
});