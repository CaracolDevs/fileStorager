const express = require('express')
const router = express.Router()

const controller = require('../controllers/directory')

const fs = require('fs')
const {promisify} = require('util')
const readdir = promisify(fs.readdir)



const routes = [
    {
        path: 'user'
    },
    {
        path: 'items'
    },
    {
        path: 'auth'
    },
    {
        path: 'upload'
    },
    {
        path: 'directory'
    }
]

let folders = controller.folders

let routing = controller.routing

let updateRouting = (req, res, next) => {
    routing(folders, router)
    next()
}

router.get('/',updateRouting,controller.checkIndex)


routes.forEach(route => {
    return router.use(`/${route.path}`, require(`./${route.path}`))
})

module.exports = router