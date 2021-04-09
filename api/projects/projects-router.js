// Imports
const Projects = require('./projects-model')
const mw = require('../middleware/middleware')
const express = require('express')

// Express Router instance
const router = express.Router()


// Projects endpoints

// [GET]    | `/api/projects`             | returns an array of projects (or an empty array) as the body of the response
router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// [GET]    | `/api/projects/:id`         | returns a project with the given `id` as the body of the response
router.get('/:id', mw.checkProjectId, (req, res) => {
    res.status(200).json(req.project)
})

// [POST]   | `/api/projects`             | returns the newly created project as the body of the response
router.post('/', mw.checkValidProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// [PUT]    | `/api/projects/:id`         | returns the updated project as the body of the response
router.put('/:id', mw.checkProjectId, mw.checkValidProject, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// [DELETE] | `/api/projects/:id`         | returns no response body
router.delete('/:id', mw.checkProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: `Project id=${id} deleted` })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// [GET]    | `/api/projects/:id/actions` | sends an array of actions (or an empty array) as the body of the response
router.get('/:id/actions', mw.checkProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})


// Exports
module.exports = router