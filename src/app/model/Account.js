var mongoose = require('mongoose');
var Schema = mongoose.Schema
var slug = require('mongoose-slug-generator')

var mongooseDelete = require('mongoose-delete')

const Account = new Schema({
    username : { type: String, minlength: 1, default: 'taikhoan'},
    password: { type: String, default: '0' },
    role: { type: String, default: '0' },
    tennhanvien:  { type: mongoose.Schema.Types.ObjectId, ref:'staffs' },
    slug: { type: String, slug: 'username', unique: true},
    
  },{timestamps: true,});

  //Plugin
mongoose.plugin(slug)
Account.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('accounts', Account)