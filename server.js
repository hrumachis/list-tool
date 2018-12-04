const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./dist'));

app.get('/*', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});
app.listen(process.env.PORT || 8080, () => {
    console.log("server started");
});