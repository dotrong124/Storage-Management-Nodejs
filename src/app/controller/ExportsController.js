var Product =  require('../model/Product')
var Item =  require('../model/Item')
var Supplies =  require('../model/Supplies')
var Distributor =  require('../model/Distributor')
var Staff =  require('../model/Staff')
var account =  require('../model/Account')
var Export =  require('../model/Export')


var { multipleMoongoseToObject } = require('../../util/mongoose')
var { moongoseToObject } = require('../../util/mongoose')

var hbsContent = {userName:'req.data.username',loggedIn: true}

class ExportsController{
    add = async (req, res,next)=> {
        var newExport = new Export(req.body)
        newExport.productId = {_id: req.body._id}
        newExport.userId = req.data._id
        await newExport.save()
        res.redirect('/exports')
      }
    
    trash(req, res, next){
        Export.findDeleted({})
        .populate('tendoitac')
        .then(exportInfo => {
            res.render ('exports/trash', {
                exportInfo: multipleMoongoseToObject(exportInfo),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
    }
    show(req, res, next){
        Export.findOne({slug: req.params.slug})
        .populate('tendoitac')
        .populate('userId')
            .then(exportinfo => {
                res.render('exports/show', {
                    exportinfo: moongoseToObject(exportinfo),
                    tensanpham: moongoseToObject(exportinfo.tensanpham),
                    kho: moongoseToObject(exportinfo.kho),
                    soluong: moongoseToObject(exportinfo.soluong),
                    khoiluong: moongoseToObject(exportinfo.khoiluong),
                    chiphi: moongoseToObject(exportinfo.chiphi),
                    m3: moongoseToObject(exportinfo.m3),
                    tongkhoiluongloai: moongoseToObject(exportinfo.tongkhoiluongloai),                    
                    tongchiphiloai: moongoseToObject(exportinfo.tongchiphiloai),
                    tongm3loai: moongoseToObject(exportinfo.tongm3loai),
                    loggedIn: hbsContent.loggedIn
                })
            })
            .catch(next)
    }
    edit(req, res, next){
        Export.findById(req.params.id)
        .then(exportinfo => {
            res.render('export/edit',{
                exportinfo: moongoseToObject(exportinfo),
                tensanpham: moongoseToObject(exportinfo.tensanpham),
                kho: moongoseToObject(exportinfo.kho),
                soluong: moongoseToObject(exportinfo.soluong),
                khoiluong: moongoseToObject(exportinfo.khoiluong),
                chiphi: moongoseToObject(exportinfo.chiphi),
                m3: moongoseToObject(exportinfo.m3),
                tongkhoiluongloai: moongoseToObject(exportinfo.tongkhoiluongloai),                    
                tongchiphiloai: moongoseToObject(exportinfo.tongchiphiloai),
                tongm3loai: moongoseToObject(exportinfo.tongm3loai),
                loggedIn: hbsContent.loggedIn
            })
        })
        .catch(next)
        // res.json({data: req.body})
    }

    softDelete  (req, res,next){
        Export.delete({_id: req.params.id})
          .then(()=> res.redirect('/exports'))
          .catch(next)
      }
    delete (req, res,next) {
        Export.deleteOne({_id: req.params.id})
          .then(()=> res.redirect('/exports'))
          .catch(next)
      }
    restore (req, res,next) {
        Export.restore({_id: req.params.id})
          .then(()=> res.redirect('/exports/trash'))
          .catch(next)
      }
}
module.exports = new ExportsController