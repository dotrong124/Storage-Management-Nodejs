var Item =  require('../model/Item')
var Storage =  require('../model/Storage')
var Supplies = require('../model/Supplies')
var { moongoseToObject } = require('../../util/mongoose')
var { multipleMoongoseToObject } = require('../../util/mongoose')
var hbsContent = {userName:'req.data.username',loggedIn: true}

class ItemController{
    //[GET] items/products
    show(req, res, next){
        Item.findOne({slug: req.params.slug})
        .populate('kho')
        .populate('userId')
            .then(items => {
                res.render('items/show', {
                    items: moongoseToObject(items),
                    loggedIn: hbsContent.loggedIn
                })
            })
            .catch(next)
    }
    //[GET] items/create
    create(req, res){
        Promise.all([Storage.find({}), Supplies.find({})])
        // Storage.find({})
        .then(([storage,supplies]) => {
            res.render('items/create',{
                loggedIn: hbsContent.loggedIn,
                storage: multipleMoongoseToObject(storage),
                supplies: multipleMoongoseToObject(supplies),
                })
            })
        .catch()
    }
    //[GET] items/:slug/edit
    edit(req, res, next){
        Promise.all([Item.findById(req.params.id), Storage.find({}), Supplies.find({})])
        .then(([items, storage,supplies]) => {
            res.render('items/edit',{
                item: moongoseToObject(items),
                storage: multipleMoongoseToObject(storage),
                supplies: multipleMoongoseToObject(supplies),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    }
    
    //Thùng rác
    //[GET] products/trash
    trash(req, res, next){
        Item.findDeleted({})
        .populate('kho')
        .then(items => {
            res.render ('items/trash', {
                items: multipleMoongoseToObject(items),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    // res.render('home')
    }

    additem = async (req, res, next)=> {
        var formData = req.body
        var item = new Item(formData)
        item.userId = req.data._id
        item.save()
        res.redirect('/items')
      }

    update (req, res,next) {
        Item.updateOne({_id: req.params.id},req.body)
          .then(()=> res.redirect('/items'))
          .catch(next)
      }
    
    softDelete (req, res,next) {
        Item.delete({_id: req.params.id})
          .then(()=> res.redirect('/items'))
          .catch(next)
      }

    delete (req, res,next) {
        Item.deleteOne({_id: req.params.id})
          .then(()=> res.redirect('/items'))
          .catch(next)
      }

    restore (req, res,next) {
        Item.restore({_id: req.params.id})
          .then(()=> res.redirect('/items'))
          .catch(next)
      }
}

module.exports = new ItemController