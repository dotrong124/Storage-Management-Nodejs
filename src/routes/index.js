var alert = require('alert')
var siteRouter = require('./site')
var productsRouter = require('./products')
var itemsRouter = require('./items')
var accountsRouter = require('./account')
var jwt = require('jsonwebtoken')
function route(app){
  
      app.use('/home', siteRouter)
      app.use('/search',private,checkRoleManager,siteRouter)
      app.use('/products',private,checkRoleManager, productsRouter)
      app.use('/items',private,checkRoleManager, itemsRouter)
      app.use('/account',  accountsRouter)
      app.use('/register', accountsRouter)
      app.use('',siteRouter)
}
module.exports = route

function private(req,res,next){
      try{
        var verify = jwt.verify(req.cookies.token,'passWord')
        Account.findOne({_id: verify})
        .then(data=>{
          if(verify){
            req.data = data
            next()
          }
          else{
            res.redirect('/home')
            alert('Bạn cần đăng nhập')
          }
        })
        
      }
      catch(err){
        return res.json('Loi sv')
      }
}


  function checkRoleManager(req,res,next){
    var role = req.data.role
    if ( role === 'admin' || role === 'manager'){
      next()
    }
    else{
      res.redirect('/home')
      alert('Bạn không có quyền')
    }
  }


  
  function checkRoleAdmin(req,res,next){
      var role = req.data.role
      if ( role === 'admin'){
            next()
      }
      else{
            res.redirect('/home')
            alert('Bạn không có quyền')
      }
    }