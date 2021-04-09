// Imports
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
const express = require('express');

// Express server instance
const server = express();


// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)


// Exports
module.exports = server;
