const express = require('express')
const controller = require('../controllers/directory')
const router = express.Router()

router.post(
    `/create`,
    controller.create
)

router.post(
    `/delete`,
    controller.delete
)

router.post(
    `/upload`,
    controller.upload,
    controller.uploadFile,
    controller.moveFile
)

router.get(
    `/check`,
    controller.check
)

router.post(
    `/download`,
    controller.downloadFile
)

module.exports = router