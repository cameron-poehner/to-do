const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 8000;

app.get('/', (req, res) => {
    console.log('Process', process.env)
    res.send('Hey Cam! you beautiful bastard!');
})

app.listen(PORT, () => {
    console.log(`Example running on port ${PORT}`);
})