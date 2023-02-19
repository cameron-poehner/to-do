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

app.get('/todos/:list/:userEmail', async (req, res) => {
    const { list, userEmail } = req.params;

    try {
        const todos = await dbPool.query('SELECT * FROM todos WHERE list_id = $1 AND user_email = $2', [list, userEmail]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err);
    }
});

app.get('/lists/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    console.log('user email', userEmail)
    console.log('route params', req.params);

    try {
        const lists = await dbPool.query('SELECT * FROM lists WHERE user_email = $1', [userEmail]);
        // console.log('lists', lists);
        res.json(lists.rows);
    } catch (err) {
        console.error(err);
    }
});

app.get('/lists/:list/:userEmail', async (req, res) => {
    const { list, userEmail } = req.params;
    try {
        const getList = await dbPool.query('SELECT * FROM lists WHERE id = $1 AND user_email = $2', [list, userEmail]);
        res.json(getList.rows);
    } catch (err) {
        console.error(err);
    }
});

app.post('/lists', async (req, res) => {
    const id = uuidv4();
    const {
        title,
        user_email
    } = req.body;

    try {
        const newList = await dbPool.query(`Insert INTO lists(id, title, user_email) VALUES($1, $2, $3)`, [id, title, user_email]);
        res.json(newList);
    } catch (err) {
        console.error(err);
    }
})

app.post('/todos', async (req, res) => {
    const id = uuidv4();
    const {
        user_email,
        title,
        completed,
        date,
        notes,
        list_id,
    } = req.body;
    try {
        const newToDo = await dbPool.query(`Insert INTO todos(id, user_email, title, completed, notes, list_id, date) VALUES($1, $2, $3, $4, $5, $6, $7)`,
            [id, user_email, title, completed, notes, list_id, date]);
        res.json(newToDo);
    } catch (err) {
        console.error(err);
    }
});

app.put('/lists/:list', async (req, res) => {
    const { list } = req.params;
    const { title, user_email } = req.body;
    try {
        const updatedList = await dbPool.query('UPDATE lists SET title = $1 WHERE id = $2 AND user_email = $3', [title, list, user_email])
        res.json(updatedList);
    } catch (err) {
        console.error(err);
    }
})

// app.put('/update', async (req, res) => {
//     // const { id } = req.params;
//     try {
//         const updateToDo = await dbPool.query('CREATE TABLE lists (id VARCHAR(255) PRIMARY KEY, title VARCHAR(255), user_email VARCHAR(255))');

//         res.json(updateToDo);
//     } catch (err) {
//         console.error(err);
//     }
// })

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

app.delete('/lists/:list/:userEmail', async (req, res) => {
    const { list, user_email } = req.params;
    try {
        const deletedList = await dbPool.query(`DELETE FROM lists WHERE id = $1`, [list]);
        const deletedTodos = await dbPool.query(`DELETE FROM todos WHERE list_id = $1`, [list])
        res.json({
            deletedList,
            deletedTodos,
        });
    } catch (err) {
        console.error(err);
    }
})

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10)
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
        const users = await dbPool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (!users.rows.length) return res.json({ detail: 'User does not exist' });

        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

        if (success) {
            res.json({ 'email': users.rows[0].email, token })
        } else {
            res.json({ detail: 'Login failed' })
        }
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`Example running on port ${PORT}`);
});