const mongoose = require('mongoose');
// Method for connecting with the 'chatbot-api' database
mongoose.connect('mongodb://127.0.0.1:27017/chatbot-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});