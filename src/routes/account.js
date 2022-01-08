var express = require('express')
const AccountController = require('../app/controller/AccountsController')
var router = express.Router()

router.get('/register/', AccountController.register)
// router.post('/addproduct', ProductController.addproduct)


module.exports = router


