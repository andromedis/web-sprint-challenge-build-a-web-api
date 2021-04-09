// Server action inputs
const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')


// Checks for valid resources on server
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


// Checks for valid resources to send server
const checkValidAction = (req, res, next) => {
    const { project_id, description, notes, completed } = req.body
    // project_id  | number  | required     | is id of existing project
    // description | string  | required     | <= 128 characters
    // notes       | string  | required     |
    // completed   | boolean | not required |

    if (!project_id || !description || !notes) {
        res.status(400).json(`Action: \`project_id\`, \`description\`, \`notes\` are required fields`)
    }
    else {
        next()
    }
}

const checkValidProject = (req, res, next) => {
    const { name, description, completed } = req.body
    // name        | string  | required
    // description | string  | required
    // completed   | boolean | not required

    if (!name || !description) {
        res.status(400).json(`Project: \`name\`, \`description\` are required fields`)
    }
    else {
        next()
    }
}


// Exports
module.exports = {
    checkActionId,
    checkProjectId,
    checkValidAction,
    checkValidProject
}