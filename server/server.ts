require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT ?? 8000;
const dbPool = require('./db');

app.use(cors());

app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params;

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