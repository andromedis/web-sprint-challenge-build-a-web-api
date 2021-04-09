const Actions = require('../actions/actions-model')

const checkActionId = (req, res, next) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json(`Action id=${id} not found`)
            }
            else {
                req.action = action
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

module.exports = {
    checkActionId
}