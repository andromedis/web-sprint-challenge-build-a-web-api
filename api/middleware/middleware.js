const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')

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

const checkProjectId = (req, res, next) => {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json(`Project id=${id} not found`)
            }
            else {
                req.project = project
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

module.exports = {
    checkActionId,
    checkProjectId
}