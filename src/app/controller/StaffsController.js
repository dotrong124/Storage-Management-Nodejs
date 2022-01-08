var Staff =  require('../model/Staff')
var Storage =  require('../model/Storage')
var { moongoseToObject } = require('../../util/mongoose')
var { multipleMoongoseToObject } = require('../../util/mongoose')
var hbsContent = {userName:'req.data.username',loggedIn: true}

class StaffController{
    //[GET] staffs/products
    show(req, res, next){
        Staff.findOne({slug: req.params.slug})
        .populate('kho')
            .then(staffs => {
                res.render('staffs/show', {
                    staffs: moongoseToObject(staffs),
                    loggedIn: hbsContent.loggedIn
                })
            })
            .catch(next)
    }
    //[GET] staffs/create
    create(req, res, next){
        Storage.find({})
        .then(storage => {
            res.render('staffs/create',{
            storage: multipleMoongoseToObject(storage),
            loggedIn: hbsContent.loggedIn})
        })
        
    }
    //[GET] staffs/:slug/edit
    edit(req, res, next){
        Promise.all([Staff.findById(req.params.id), Storage.find({})])
        .then(([staffs,storage])=> {
            res.render('staffs/edit',{
                staff: moongoseToObject(staffs),
                storage: multipleMoongoseToObject(storage),
                loggedIn: hbsContent.loggedIn
            })        
        })
        .catch(next)
    }
    
    //Thùng rác
    //[GET] staffs/trash
    trash(req, res, next){
        Staff.findDeleted({})
        .then(staffs => {
            res.render ('staffs/trash', {
                staffs: multipleMoongoseToObject(staffs),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    }

    add (req, res) {
        var formData = req.body
        var staff = new Staff(formData)
        staff.save()
        res.redirect('/staffs')
      }

    update (req, res,next) {
        Staff.updateOne({_id: req.params.id},req.body)
          .then(()=> res.redirect('/staffs'))
          .catch(next)
      }
    
    softDelete (req, res,next) {
        Staff.delete({_id: req.params.id})
          .then(()=> res.redirect('/staffs'))
          .catch(next)
      }

    delete (req, res,next) {
        Staff.deleteOne({_id: req.params.id})
          .then(()=> res.redirect('/staffs'))
          .catch(next)
      }

    restore (req, res,next) {
        Staff.restore({_id: req.params.id})
          .then(()=> res.redirect('/staffs'))
          .catch(next)
      }
}

module.exports = new StaffController