const express = require('express');


const actionsRouter = require('./actions/actions-router')
const Actions = require('./actions/actions-model')

const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())

server.use('/api/actions', actionsRouter)


module.exports = server;
