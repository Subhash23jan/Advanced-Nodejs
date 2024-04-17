const http = require('http');
const express = require('express');
const router = require('./router');
const app = express();
const seerver = http.createServer(app);
const PORT = 3000;

app.use(router);



app.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`);
});