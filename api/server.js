const express = require("express");

const server = express();

server.get('/', (req, res) => {
    res.send('Let us learn firestore!!')
})

module.exports = server;