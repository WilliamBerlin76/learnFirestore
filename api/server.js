const express = require("express");

const server = express();

const globalMiddleware = require('../config/middlewareConfig');
globalMiddleware(server);

const apiRouter = require('./api-router');

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.send('Let us learn firestore!!')
})

module.exports = server;