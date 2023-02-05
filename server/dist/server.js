var _a;
const express = require('express');
const app = express();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
app.get('/', (req, res) => {
    res.send('Hey Cam!😎');
});
app.listen(PORT, () => {
    console.log(`Example running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map