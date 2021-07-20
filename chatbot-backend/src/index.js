const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const productRouter = require('./routers/product');
const chatRouter = require('./routers/chat');

const app = express();
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(chatRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});