// Imports
const Actions = require('./actions-model')
const mw = require('../middleware/middleware')
const express = require('express')

// Express Router instance
const router = express.Router()


// Actions endpoints

// [GET]    | `/api/actions`     | returns an array of actions (or an empty array) as the body of the _response_
router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// [GET]    | `/api/actions/:id` | returns an action with the given `id` as the body of the _response_
router.get('/:id', mw.checkActionId, (req, res) => {
    res.status(200).json(req.action)
})

// [POST]   | `/api/actions`     | returns the newly created action as the body of the _response_
router.post('/', mw.checkValidAction, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// [PUT]    | `/api/actions/:id` | returns the updated action as the body of the _response_
router.put('/:id', mw.checkActionId, mw.checkValidAction, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// [DELETE] | `/api/actions/:id` | returns no _response_ body
router.delete('/:id', mw.checkActionId, (req, res) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: `Action id=${id} deleted` })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})


// Exports
module.exports = router