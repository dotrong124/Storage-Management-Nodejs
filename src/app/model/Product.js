var mongoose = require('mongoose');
var Schema = mongoose.Schema
var slug = require('mongoose-slug-generator')

var mongooseDelete = require('mongoose-delete')

const Product = new Schema({
    tensanpham: { type: String, minlength: 1, default: 'tensanpham'},
    soluong: { type: String, default: '0' },
    chiphi: { type: String, default: '0' },
    hinhanh: { type: String, default: '0'},
    slug: { type: String, slug: 'tensanpham', unique: true},
    kho: { type: mongoose.Schema.Types.ObjectId, ref:'storages' },
    mota: { type: String, default: '0'},
    m3:  { type: String, default: '0'},
    khoiluong:  { type: String, default: '0'},
    tongkhoiluong: { type: String, default: '0'},
    tongm3: { type: String, default: '0'},
    tongchiphi: { type: String, default: '0'},
    userId:  { type: mongoose.Schema.Types.ObjectId, ref:'accounts' }
  }, {timestamps: true,});

  //Plugin
mongoose.plugin(slug)
Product.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('products', Product)