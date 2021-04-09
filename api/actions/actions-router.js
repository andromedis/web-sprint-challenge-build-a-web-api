// Write your "actions" router here!

// - [ ] Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:
//   - `[GET] /api/actions` returns an array of actions (or an empty array) as the body of the _response_.
//   - `[GET] /api/actions/:id` returns an action with the given `id` as the body of the _response_.
//   - `[POST] /api/actions` returns the newly created action as the body of the _response_.
//   - `[PUT] /api/actions/:id` returns the updated action as the body of the _response_.
//   - `[DELETE] /api/actions/:id` returns no _response_ body.

// Imports
const Actions = require('./actions-model')
const mw = require('../middleware/middleware')
const express = require('express')

// Router instance
const router = express.Router()

// Actions endpoints

// [GET]    | `/api/actions`     | returns an array of actions (or an empty array) as the body of the _response_
router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: err.message })
        })
})

// [GET]    | `/api/actions/:id` | returns an action with the given `id` as the body of the _response_
router.get('/:id', mw.checkActionId, (req, res) => {
    res.status(200).json(req.action)
})

// [POST]   | `/api/actions`     | returns the newly created action as the body of the _response_
// router.post('/', (req, res) => {
//     Actions.insert(req.body)
//         .then(action => {
//             res.status(201).json(action)
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({ message: err.message })
//         })
// })

// [PUT]    | `/api/actions/:id` | returns the updated action as the body of the _response_
// router.put('/:id', (req, res) => {

// })

// [DELETE] | `/api/actions/:id` | returns no _response_ body
router.delete('/:id', mw.checkActionId, (req, res) => {
    const { id } = req.params
    Actions.remove(id)
        .then(() => {
            res.status(200).json({ message: `Action id=${id} deleted` })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// Module exports
module.exports = router