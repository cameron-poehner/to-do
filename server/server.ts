require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 8000;
const dbPool = require('./db');

app.get('/todos', async (req, res) => {
    const userEmail = 'cam@test.com';

    try {
        const todos = await dbPool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err);
    }
})



app.listen(PORT, () => {
    console.log(`Example running on port ${PORT}`);
})