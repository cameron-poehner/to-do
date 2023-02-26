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

    try {
        const lists = await dbPool.query('SELECT * FROM lists WHERE user_email = $1 ORDER BY date', [userEmail]);
        console.log('lists', lists.rows);
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
        user_email,
        date
    } = req.body;

    try {
        const newList = await dbPool.query(`Insert INTO lists(id, title, user_email, date) VALUES($1, $2, $3, $4)`, [id, title, user_email, date]);
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
    const { title, user_email, date } = req.body;
    try {
        const updatedList = await dbPool.query('UPDATE lists SET title = $1, user_email = $2, date = $3 WHERE id = $4', [title, user_email, date, list])
        console.log('Updated List', updatedList);
        res.json(updatedList);
    } catch (err) {
        console.error(err);
    }
})

app.put('/update', async (req, res) => {
    // const { id } = req.params;
    const { user_name, email } = req.body;
    try {
        const updateToDo = await dbPool.query('UPDATE users SET user_name = $1 WHERE email = $2', [user_name, email]);

        res.json(updateToDo);
    } catch (err) {
        console.error(err);
    }
})

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { user_email, title, completed, date, notes, list_id } = req.body;
    try {
        const editToDo = await dbPool.query('UPDATE todos SET user_email = $1, title = $2, completed = $3, date = $4, notes = $5, list_id = $6 WHERE id = $7;',
            [user_email, title, completed, date, notes, list_id, id]);
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
    const { email, password, userName } = req.body;
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log('body', req.body);
    try {
        const signUp = await dbPool.query(`INSERT INTO users (email, hashed_password, user_name) VALUES($1, $2, $3)`, [email, hashedPassword, userName])

        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
        console.log('Sign Up', signUp);
        console.log('user name', userName);
        res.json({ email, token, userName });
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
            console.log('Users', users.rows);
            res.json({ 'email': users.rows[0].email, token, 'userName': users.rows[0].user_name, })
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