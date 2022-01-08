var Distributor =  require('../model/Distributor')
var { moongoseToObject } = require('../../util/mongoose')
var { multipleMoongoseToObject } = require('../../util/mongoose')
var hbsContent = {userName:'req.data.username',loggedIn: true}

class DistributorController{
    //[GET] distributors/products
    show(req, res, next){
        Distributor.findOne({slug: req.params.slug})
            .then(distributors => {
                res.render('distributors/show', {
                    distributors: moongoseToObject(distributors),
                    loggedIn: hbsContent.loggedIn
                })
            })
            .catch(next)
    }
    //[GET] distributors/create
    create(req, res, next){
        res.render('distributors/create',{
            loggedIn: hbsContent.loggedIn})
    }
    //[GET] distributors/:slug/edit
    edit(req, res, next){
        Distributor.findById(req.params.id)
        .then(distributors => {
            res.render('distributors/edit',{
                distributors: moongoseToObject(distributors),
                loggedIn: hbsContent.loggedIn
            })        
        })
        .catch(next)
    }
    
    //Thùng rác
    //[GET] distributors/trash
    trash(req, res, next){
        Distributor.findDeleted({})
        .then(distributors => {
            res.render ('distributors/trash', {
                distributors: multipleMoongoseToObject(distributors),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    }

    add (req, res) {
        var formData = req.body
        var distributors = new Distributor(formData)
        distributors.save()
        res.redirect('/distributors')
      }

    update (req, res,next) {
        Distributor.updateOne({_id: req.params.id},req.body)
          .then(()=> res.redirect('/distributors'))
          .catch(next)
      }
    
    softDelete (req, res,next) {
        Distributor.delete({_id: req.params.id})
          .then(()=> res.redirect('/distributors'))
          .catch(next)
      }

    delete (req, res,next) {
        Distributor.deleteOne({_id: req.params.id})
          .then(()=> res.redirect('/distributors'))
          .catch(next)
      }

    restore (req, res,next) {
        Distributor.restore({_id: req.params.id})
          .then(()=> res.redirect('/distributors'))
          .catch(next)
      }
}

module.exports = new DistributorController