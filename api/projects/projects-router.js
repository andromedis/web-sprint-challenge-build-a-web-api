// Write your "projects" router here!

// - [ ] Inside `api/projects/projects-router.js` build endpoints for performing CRUD operations on _projects_:
//   - `[GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
//   - `[GET] /api/projects/:id` returns a project with the given `id` as the body of the _response_.
//   - `[POST] /api/projects` returns the newly created project as the body of the _response_.
//   - `[PUT] /api/projects/:id` returns the updated project as the body of the _response_.
//   - `[DELETE] /api/projects/:id` returns no _response_ body.

// - [ ] Inside `api/projects/projects-router.js` add an endpoint for retrieving the list of actions for a project:
//   - `[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.

// Imports
const Projects = require('./projects-model')
const mw = require('../middleware/middleware')
const express = require('express')

// Router instance
const router = express.Router()


// Projects endpoints

// [GET]    | `/api/projects`             | returns an array of projects (or an empty array) as the body of the response
router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: err.message })
        })
})

// [GET]    | `/api/projects/:id`         | returns a project with the given `id` as the body of the response
router.get('/:id', mw.checkProjectId, (req, res) => {
    res.status(200).json(req.project)
})

// [POST]   | `/api/projects`             | returns the newly created project as the body of the response
router.post('/', (req, res) => {

})

// [PUT]    | `/api/projects/:id`         | returns the updated project as the body of the response
router.put('/:id', (req, res) => {

})

// [DELETE] | `/api/projects/:id`         | returns no response body
router.delete('/:id', mw.checkProjectId, (req, res) => {
    const { id } = req.params
    Projects.remove(id)
        .then(() => {
            res.status(200).json({ message: `Project id=${id} deleted` })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// [GET]    | `/api/projects/:id/actions` | sends an array of actions (or an empty array) as the body of the response
router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})


// Module exports
module.exports = router