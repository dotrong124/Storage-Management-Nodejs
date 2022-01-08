var Supplies =  require('../model/Supplies')
var { moongoseToObject } = require('../../util/mongoose')
var { multipleMoongoseToObject } = require('../../util/mongoose')
var hbsContent = {userName:'req.data.username',loggedIn: true}

class SuppliesController{
    //[GET] supplies/products
    show(req, res, next){
        Supplies.findOne({slug: req.params.slug})
            .then(supplies => {
                res.render('supplies/show', {
                    supplies: moongoseToObject(supplies),
                    loggedIn: hbsContent.loggedIn
                })
            })
            .catch(next)
    }
    //[GET] supplies/create
    create(req, res, next){
        res.render('supplies/create',{
            loggedIn: hbsContent.loggedIn})
    }
    //[GET] supplies/:slug/edit
    edit(req, res, next){
        Supplies.findById(req.params.id)
        .then(supplies => {
            res.render('supplies/edit',{
                product: moongoseToObject(supplies),
                loggedIn: hbsContent.loggedIn
            })        
        })
        .catch(next)
    }
    
    //Thùng rác
    //[GET] supplies/trash
    trash(req, res, next){
        Supplies.findDeleted({})
        .then(supplies => {
            res.render ('supplies/trash', {
                supplies: multipleMoongoseToObject(supplies),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    }

    add (req, res) {
        var formData = req.body
        var supplies = new Supplies(formData)
        supplies.save()
        res.redirect('/supplies')
      }

    update (req, res,next) {
        Supplies.updateOne({_id: req.params.id},req.body)
          .then(()=> res.redirect('/supplies'))
          .catch(next)
      }
    
    softDelete (req, res,next) {
        Supplies.delete({_id: req.params.id})
          .then(()=> res.redirect('/supplies'))
          .catch(next)
      }

    delete (req, res,next) {
        Supplies.deleteOne({_id: req.params.id})
          .then(()=> res.redirect('/supplies'))
          .catch(next)
      }

    restore (req, res,next) {
        Supplies.restore({_id: req.params.id})
          .then(()=> res.redirect('/supplies'))
          .catch(next)
      }
}

module.exports = new SuppliesController