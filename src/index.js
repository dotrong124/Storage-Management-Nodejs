var Product = require('../src/app/model/Product')
var Item = require('../src/app/model/Item')
var Account = require('../src/app/model/Account')
var siteController = require('../src/app/controller/SiteController')
var productsController = require('../src/app/controller/ProductsController')
var accountsController = require('../src/app/controller/AccountsController')
var itemsController = require('../src/app/controller/ItemsController')
var staffController = require('../src/app/controller/StaffsController')
var exportController = require('../src/app/controller/ExportsController')
var distributorController = require('../src/app/controller/DistributorController')
var suppliesController = require('../src/app/controller/SuppliesController')
var storagesController = require('../src/app/controller/StorageController')
var { multipleMoongoseToObject } = require('./util/mongoose')
var express  = require('express')
var app = express()
var session = require('express-session')
var port = 3000
var handlebars  = require('express-handlebars')
var path = require('path')
var db = require('./config/db')
var mongoose = require('mongoose')
var methodOverride = require('method-override')
var jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
var alert = require('alert')

db.connect()
app.use(express.urlencoded({
  extended:true
}))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(cookieParser())
app.engine('hbs', handlebars({
  extname:'.hbs',
  helpers:{
    sum: (a,b) => a+b,
    mul: (a,b) => a*b,
    sub: (a,b) => a-b,
  },
}))
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resource/views'))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
var loggedIn = false 
app.use(session({
  secret: 'passWord',
  resave: false,
  saveUninitialized: true,
  loggedIn:true,  
  cookie: { secure: false,
            maxAge: 7200000}
}))

//Start Route


  app.get('/home', siteController.index)

//Login
  app.get("/login", function (req, res) {
    res.render('partials/login')
  })
  app.post("/account/login/user", function (req, res){
    var userName = req.body.username
    var passWord = req.body.password
    Account.findOne({username: userName, password: passWord})
    
      .then(data=>{
        if(data){
          var token = jwt.sign({_id:data._id},'passWord')
          res.cookie('token',token,{ expires: new Date(Date.now() + 7200000)})
          // res.render('home',{loggedIn:hbsContent.loggedIn})
          res.redirect('/storages')
        }
        else{
          res.redirect('/login')
        }
      })
      .catch(err=>{
        res.status(500).json('dang nhap that bai')
      })
  })

  app.get('/logout',private,checkRoleManager, (req , res,next)=>{
    var verify = jwt.verify(req.cookies.token,'passWord')
    Account.findOne({_id: verify})
    .then(data=>{
      req.data = data
      if(req.data.username){
        var loggedIn = false
        var userName = req.data.username
        res.clearCookie('token')
        res.redirect('/home')
      }
      else{
        res.redirect('/login')
      }
    })
    .catch()
      res.render('home')
  })
  // [PUT] register/adduser
  // Thêm tài khoản
  app.post("/account/register/adduser",private,checkRoleAdmin, accountsController.addUser)
  app.get("/account/register",private,checkRoleAdmin, accountsController.register)
  app.delete("/account/:id",private,checkRoleAdmin, accountsController.softDelete)
  app.delete("/account/:id/force",private,checkRoleAdmin, accountsController.delete)
  app.get("/account/trash",private,checkRoleAdmin, accountsController.trash)
  app.get('/account/:id/edit',private, checkRoleManager, accountsController.edit)
  app.put("/account/:id",private,checkRoleManager, accountsController.update)  
  app.get("/account",private,checkRoleAdmin, accountsController.index)


  app.post('/exports/create',private,checkRoleAdmin, exportController.add)
  app.get('/exports/trash',private,checkRoleAdmin, exportController.trash)
  app.get('/exports/:id/edit',private,checkRoleAdmin, exportController.edit)
  app.get('/exports',private,checkRoleAdmin, siteController.export)
  app.delete("/exports/:id",private,checkRoleAdmin, exportController.softDelete)
  app.delete("/exports/:id/force",private,checkRoleAdmin, exportController.delete)
  app.get('/exports/:slug',private, checkRoleAdmin, exportController.show)
  app.patch("/exports/:id/restore",private,checkRoleAdmin, exportController.restore)




  //Product route
  //Trang sản phẩm
  app.get('/products', private, checkRoleManager, siteController.products)

  //Trang tạo sản phẩm
  app.get('/products/create',private, checkRoleManager, productsController.create)
  app.post("/products/add",private,checkRoleManager, productsController.addproduct)
  //Trang cập nhật sản phẩm
  app.get('/products/:id/edit',private, checkRoleManager, productsController.edit)
  app.put("/products/:id",private,checkRoleManager, productsController.update)
  
//Thùng rác sản phẩm
  app.get('/products/trash',private, checkRoleManager, productsController.trash)

  // Xóa mềm sản phẩm
  app.delete("/products/:id",private,checkRoleManager, productsController.softDelete)

  // Xóa vĩnh viễn sản phẩm
  app.delete("/products/:id/force",private,checkRoleManager, productsController.delete)

  // Restore sản phẩm đã xóa mềm
  app.patch("/products/:id/restore",private,checkRoleManager, productsController.restore)

  // Chọn hành động sản phẩm 
  app.post("/products/handle-form-action",private,checkRoleAdmin, siteController.handle)
  app.post('/exports/create',private,checkRoleAdmin, )
  //Trang show từng sản phẩm
  app.get('/products/:slug',private, checkRoleManager, productsController.show)



  //Item route
  //Trang nguyên liệu
  app.get('/items', private, checkRoleManager, siteController.items)

  //Tạo nguyên liệu
  app.get('/items/create',private,checkRoleManager, itemsController.create)
  app.post("/items/add",private,checkRoleManager, itemsController.additem)

  // Cập nhật nguyên liệu
  app.get('/items/:id/edit',private,checkRoleManager, itemsController.edit)
  app.put("/items/:id",private,checkRoleManager, itemsController.update)

  //Trang thùng rác nguyên liệu
  app.get('/items/trash',private,checkRoleManager, itemsController.trash)

  // Xóa nguyên liệu
  app.delete("/items/:id",private,checkRoleManager, itemsController.softDelete)

  // Xóa vĩnh viễn nguyên liệu
  app.delete("/items/:id/force",private,checkRoleManager, itemsController.delete)

  // Restore nguyên liệu đã xóa mềm
  app.patch("/items/:id/restore",private,checkRoleManager, itemsController.restore)
  
  //Trang show từng sản phẩm
  app.get('/items/:slug',private,checkRoleManager, itemsController.show)
  
  
  


  //Item route
  //Trang nhân viên
  app.get('/staffs', private, checkRoleAdmin, siteController.staffs)

  //Tạo nhân viên
  app.get('/staffs/create',private,checkRoleAdmin, staffController.create)
  app.post("/staffs/add",private,checkRoleAdmin, staffController.add)
  // Cập nhật nhân viên
  app.get('/staffs/:id/edit',private,checkRoleAdmin, staffController.edit)
  app.put("/staffs/:id",private,checkRoleAdmin, staffController.update)

  //Trang thùng rác nhân viên
  app.get('/staffs/trash',private,checkRoleAdmin, staffController.trash)

  // Xóa nhân viên
  app.delete("/staffs/:id",private,checkRoleAdmin, staffController.softDelete)

  // Xóa vĩnh viễn nhân viên
  app.delete("/staffs/:id/force",private,checkRoleAdmin, staffController.delete)

  // Restore nhân viên đã xóa mềm
  app.patch("/staffs/:id/restore",private,checkRoleAdmin, staffController.restore)
  
  //Trang show từng nhân viên
  app.get('/staffs/:slug',private,checkRoleAdmin, staffController.show)
  




  //Item route
  //Trang nhà phân phối sản phẩm
  app.get('/distributors', private, checkRoleAdmin, siteController.distributors)

  //Tạo nhà phân phối sản phẩm
  app.get('/distributors/create',private,checkRoleAdmin, distributorController.create)
  app.post("/distributors/add",private,checkRoleAdmin, distributorController.add)
  // Cập nhật nhà phân phối sản phẩm
  app.get('/distributors/:id/edit',private,checkRoleAdmin, distributorController.edit)
  app.put("/distributors/:id",private,checkRoleAdmin, distributorController.update)

  //Trang thùng rác nhà phân phối sản phẩm
  app.get('/distributors/trash',private,checkRoleAdmin, distributorController.trash)

  // Xóa nhà phân phối sản phẩm
  app.delete("/distributors/:id",private,checkRoleAdmin, distributorController.softDelete)

  // Xóa vĩnh viễn nhà phân phối sản phẩm
  app.delete("/distributors/:id/force",private,checkRoleAdmin, distributorController.delete)

  // Restore nhà phân phối sản phẩm
  app.patch("/distributors/:id/restore",private,checkRoleAdmin, distributorController.restore)
  
  //Trang show từng nhà phân phối sản phẩm
  app.get('/distributors/:slug',private,checkRoleAdmin, distributorController.show)
  




  //Item route
  //Trang nhà cung cấp nguyên liệu
  app.get('/supplies', private, checkRoleAdmin, siteController.supplies)

  //Tạo nhà cung cấp nguyên liệu
  app.get('/supplies/create',private,checkRoleAdmin, suppliesController.create)
  app.post("/supplies/add",private,checkRoleAdmin, suppliesController.add)
  // Cập nhật nhà cung cấp nguyên liệu
  app.get('/supplies/:id/edit',private,checkRoleAdmin, suppliesController.edit)
  app.put("/supplies/:id",private,checkRoleAdmin, suppliesController.update)

  //Trang thùng rác nhà cung cấp nguyên liệu
  app.get('/supplies/trash',private,checkRoleAdmin, suppliesController.trash)
  // Xóa nhà cung cấp nguyên liệu
  app.delete("/supplies/:id",private,checkRoleAdmin, suppliesController.softDelete)

  // Xóa vĩnh viễn nhà cung cấp nguyên liệu
  app.delete("/supplies/:id/force",private,checkRoleAdmin, suppliesController.delete)

  // Restore nhà cung cấp nguyên liệu đã xóa mềm
  app.patch("/supplies/:id/restore",private,checkRoleAdmin, suppliesController.restore)
  
  //Trang show từng nhà cung cấp nguyên liệu
  app.get('/supplies/:slug',private,checkRoleAdmin, suppliesController.show)
  



  app.get('/storages',private,checkRoleAdmin, siteController.storage)

  app.get('/storages/create',private,checkRoleAdmin, storagesController.create)

  app.post('/storages/add',private,checkRoleAdmin, storagesController.add)

  app.get('/storages/trash',private,checkRoleAdmin, storagesController.trash)

  app.get('/storages/:id/edit',private,checkRoleAdmin, storagesController.edit)
  app.put("/storages/:id",private,checkRoleAdmin, storagesController.update)

  app.delete("/storages/:id",private,checkRoleAdmin, storagesController.softDelete)
  
  app.patch("/storages/:id/restore",private,checkRoleAdmin, storagesController.restore)

  app.delete("/storages/:id/force",private,checkRoleAdmin, storagesController.delete)

  app.get('/storages/:slug',private, checkRoleAdmin, storagesController.show)



  app.get('/testlogin',function(req, res, next){
    var verify = jwt.verify(req.cookies.token,'passWord')
    res.json({data: verify})
  })


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
      res.redirect('/home')
      alert('Bạn chưa được cấp quyền')
    }}
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


app.get('',siteController.index)