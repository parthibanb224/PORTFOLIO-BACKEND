const express = require('express');
const APP_SERVER = express();

APP_SERVER.get('/',(req,res,next) => {
    res.send('<h1>Portfolio</h1>');
});
APP_SERVER.use('/response',require('./Controllers/message.controller'));

module.exports = APP_SERVER;