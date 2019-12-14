const express = require("express");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Let us learn firestore!!')
})

module.exports = server;