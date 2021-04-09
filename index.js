const server = require('./api/server')
const port = 1234

server.listen(port, () => {
    console.log(`Server is alive on port ${port}`)
})
