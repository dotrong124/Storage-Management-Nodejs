var Account =  require('../model/Account')
var Staff =  require('../model/Staff')
var { moongoseToObject } = require('../../util/mongoose')
var { multipleMoongoseToObject } = require('../../util/mongoose')
var hbsContent = {userName:'req.data.username',loggedIn: true}

class AccountController{
    index (req, res, next){
        Account.find({})
            .populate('tennhanvien')
            .then(account => {
                res.render ('partials/account', {
                    account: multipleMoongoseToObject(account),
                    loggedIn: hbsContent.loggedIn
                })
            })
            .catch(next)
    }
    register(req,res){
        Staff.find({})
        .then(data => {
            res.render('partials/register',{
            loggedIn: hbsContent.loggedIn,
            staff: multipleMoongoseToObject(data)
        })
    })
    }
    addUser =  async (req, res)=> {
        var formData = req.body
        var account = new Account(formData)
        account.save()
        res.redirect('/home')
      }
    trash(req, res, next){
        Account.findDeleted({})
        .then(account => {
            res.render ('partials/trash', {
                account: multipleMoongoseToObject(account),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    // res.render('home')
    }
    edit(req, res, next){
        Promise.all([Account.findById(req.params.id),Staff.find({})])
        .then(([account,staff]) => {
            res.render('partials/edit',{
                account: moongoseToObject(account),
                staff: multipleMoongoseToObject(staff),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    }
    update (req, res,next) {
        Account.updateOne({_id: req.params.id},req.body)
          .then(()=> res.redirect('/account'))
          .catch(next)
      }
    softDelete (req, res,next) {
        Account.delete({_id: req.params.id})
          .then(()=> res.redirect('/account'))
          .catch(next)
      }

    delete (req, res,next) {
        Account.deleteOne({_id: req.params.id})
          .then(()=> res.redirect('/account'))
          .catch(next)
      }

    restore (req, res,next) {
        Account.restore({_id: req.params.id})
          .then(()=> res.redirect('/account'))
          .catch(next)
      }
}

module.exports = new AccountController