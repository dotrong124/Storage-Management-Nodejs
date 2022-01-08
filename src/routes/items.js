var express = require('express')
const ItemController = require('../app/controller/ItemsController')
var router = express.Router()

router.get('/create', ItemController.create)
router.get('/:id/edit', ItemController.edit)
router.get('/trash', ItemController.trash)
router.get('/:slug', ItemController.show)


module.exports = router