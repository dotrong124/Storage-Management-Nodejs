var express = require('express')
const ProductController = require('../app/controller/ProductsController')
var router = express.Router()

router.get('/create', ProductController.create)
router.get('/:id/edit', ProductController.edit)
router.get('/trash', ProductController.trash)
router.get('/:slug', ProductController.show)


module.exports = router