var Product =  require('../model/Product')
var Account =  require('../model/Account')
var Storage =  require('../model/Storage')
var Distributor =  require('../model/Distributor')
var { moongoseToObject } = require('../../util/mongoose')
var { multipleMoongoseToObject } = require('../../util/mongoose')
var hbsContent = {userName:'req.data.username',loggedIn: true}

class ProductController{
    //[GET] products/products
    show(req, res, next){
        Product.findOne({slug: req.params.slug})
        .populate('userId')
        .populate('kho')
            .then(products => {
                res.render('products/show', {
                    products: moongoseToObject(products),
                    loggedIn: hbsContent.loggedIn
                })
            })
            .catch(next)
    }
    //[GET] products/create
    create(req, res, next){
        Storage.find({})
        .then(storage=>{
            res.render('products/create',{
                storage: multipleMoongoseToObject(storage),
                loggedIn: hbsContent.loggedIn})})
        .catch()
    }
    //[GET] products/:slug/edit
    //Trang cập nhật sản phẩm
    edit(req, res, next){
        Promise.all([Product.findById(req.params.id), Storage.find({})])
        .then(([products, storage]) => {
            res.render('products/edit',{
                product: moongoseToObject(products),
                storage: multipleMoongoseToObject(storage),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    }
    update (req, res,next) {
        Product.updateOne({_id: req.params.id},req.body)
          .then(()=> {
              
              res.redirect('/products')
            })
          .catch(next)
      }
    //Thùng rác
    //[GET] products/trash
    trash(req, res, next){
        Product.findDeleted({})
        .populate('kho')
        .then(products => {
            res.render ('products/trash', {
                products: multipleMoongoseToObject(products),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    }
    addproduct= async (req, res,next)=> {
        var formData = req.body
        var newProduct = new Product(formData)
        newProduct.userId = req.data._id
        await newProduct.save()
        res.redirect('/products')
      }

    softDelete  (req, res,next){
        Product.delete({_id: req.params.id})
          .then(()=> res.redirect('/products'))
          .catch(next)
      }
    delete (req, res,next) {
        Product.deleteOne({_id: req.params.id})
          .then(()=> res.redirect('/products'))
          .catch(next)
      }
    restore (req, res,next) {
        Product.restore({_id: req.params.id})
          .then(()=> res.redirect('/products/trash'))
          .catch(next)
      }
}


module.exports = new ProductController