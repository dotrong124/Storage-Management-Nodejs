var mongoose = require('mongoose');
var Schema = mongoose.Schema
var slug = require('mongoose-slug-generator')

var mongooseDelete = require('mongoose-delete')

const Storage = new Schema({
    tenkho: { type: String, minlength: 1, default: 'tenkho'},
    diachi: { type: String, default: '0' },
    tienmatbang: { type: String, default: '0' },
    tiendien: { type: String, default: '0'},
    slug: { type: String, slug: 'tenkho', unique: true},
    tiennuoc: { type: String, default: '0'},
    tongchiphi: { type: String, default: '0'},
    mota: { type: String, default: '0'},
  }, {timestamps: true,});

  //Plugin
mongoose.plugin(slug)
Storage.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('storages', Storage)