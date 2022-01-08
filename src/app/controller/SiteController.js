var Product =  require('../model/Product')
var Item =  require('../model/Item')
var Supplies =  require('../model/Supplies')
var Distributor =  require('../model/Distributor')
var Staff =  require('../model/Staff')
var account =  require('../model/Account')
var ExportModel =  require('../model/Export')
var Storage =  require('../model/Storage')

var { multipleMoongoseToObject } = require('../../util/mongoose')
var hbsContent = {userName:'req.data.username',loggedIn: true}

class SiteController{

    handle (req, res,next) {
        switch(req.body.action){
          case 'delete':
            Product.delete({_id: {$in: req.body.productIds}})
              .then(()=> res.redirect('/products'))
              .catch(next)
            break
          case 'export':
            Promise.all([Product.find({_id: {$in: req.body.productIds}}).populate('kho'),Distributor.find({})])
                .then(([products,distributor]) => {
                res.render('exports/create',{
                    products: multipleMoongoseToObject(products),
                    distributor: multipleMoongoseToObject(distributor),
                    loggedIn: hbsContent.loggedIn
                })
            })
              .catch(next)
            break
          default:
        }
      }
    products (req, res, next){
       Product.find({})
        .populate('kho')
            .populate('userId')
            .then(products => {
                res.render ('products', {
                    products: multipleMoongoseToObject(products),
                    loggedIn: hbsContent.loggedIn
                })
            })
            .catch(next)
    }
    items (req, res, next){
        Item.find({})
        .populate('kho')
        .populate('tendoitac')
            .then(items => {
                res.render ('items', {
                    items: multipleMoongoseToObject(items),
                    loggedIn: hbsContent.loggedIn
                    
                })
            })
            .catch(next)
        }
    staffs (req, res, next){
            Staff.find({})
            .populate('kho')
                .then(staff => {
                    res.render ('staffs', {
                        staff: multipleMoongoseToObject(staff),
                        loggedIn: hbsContent.loggedIn
                        
                    })
                })
                .catch(next)
        }
    distributors(req, res, next){
            Distributor.find({})
            .then(distributor => {
                res.render ('distributors', {
                    distributor: multipleMoongoseToObject(distributor),
                    loggedIn: hbsContent.loggedIn
                    
                })
            })
            .catch(next)
        }

    supplies(req, res,next){
            Supplies.find({})
                    .then(supplies => {
                        res.render ('supplies', {
                            supplies: multipleMoongoseToObject(supplies),
                            loggedIn: hbsContent.loggedIn
                            
                        })
                    })
                    .catch(next)
        }
    storage(req, res,next){
            Storage.find({})
                    .then(storage => {
                        res.render ('storage', {
                            storage: multipleMoongoseToObject(storage),
                            loggedIn: hbsContent.loggedIn
                            
                        })
                    })
                    .catch(next)
        }
    
    export(req, res,next){
            ExportModel.find({})
            .populate('tendoitac')
            .populate('userId')
                    .then(exportinfo => {
                        res.render ('exports', {
                            exportinfo: multipleMoongoseToObject(exportinfo),
                            loggedIn: hbsContent.loggedIn
                        })
                    })
                    .catch(next)
        }
    index(req, res){
        res.render('home')
    }
    register(req, res){
        res.render('partials/register',{loggedIn: hbsContent.loggedIn
                                        })
        
    }
    login(req, res){
        res.render('partials/login',{   loggedIn: hbsContent.loggedIn
                                        })
    }
}
module.exports = new SiteController