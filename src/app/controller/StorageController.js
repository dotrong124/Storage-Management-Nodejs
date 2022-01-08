var Storage =  require('../model/Storage')
var { moongoseToObject } = require('../../util/mongoose')
var { multipleMoongoseToObject } = require('../../util/mongoose')
var hbsContent = {userName:'req.data.username',loggedIn: true}

class StorageController{
    //[GET] supplies/products
    show(req, res, next){
        Storage.findOne({slug: req.params.slug})
            .then(storage => {
                res.render('storages/show', {
                    storage: moongoseToObject(storage),
                    loggedIn: hbsContent.loggedIn
                })
            })
            .catch(next)
    }
    //[GET] storage/create
    create(req, res, next){
        res.render('storages/create',{
            loggedIn: hbsContent.loggedIn})
    }
    //[GET] storage/:slug/edit
    edit(req, res, next){
        Storage.findById(req.params.id)
        .then(storage => {
            res.render('storages/edit',{
                storage: moongoseToObject(storage),
                loggedIn: hbsContent.loggedIn
            })        
        })
        .catch(next)
    }
    
    //Thùng rác
    //[GET] storage/trash
    trash(req, res, next){
        Storage.findDeleted({})
        .then(storage => {
            res.render ('storages/trash', {
                storage: multipleMoongoseToObject(storage),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    }

    add (req, res) {
        var formData = req.body
        var storage = new Storage(formData)
        storage.save()
        res.redirect('/storages')
      }

    update (req, res,next) {
        Storage.updateOne({_id: req.params.id},req.body)
          .then(()=> res.redirect('/storages'))
          .catch(next)
      }
    
    softDelete (req, res,next) {
        Storage.delete({_id: req.params.id})
          .then(()=> res.redirect('/storages'))
          .catch(next)
      }

    delete (req, res,next) {
        Storage.deleteOne({_id: req.params.id})
          .then(()=> res.redirect('/storages'))
          .catch(next)
      }

    restore (req, res,next) {
        Storage.restore({_id: req.params.id})
          .then(()=> res.redirect('/storages'))
          .catch(next)
      }
}

module.exports = new StorageController