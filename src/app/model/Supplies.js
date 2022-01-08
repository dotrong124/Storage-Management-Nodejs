var mongoose = require('mongoose');
var Schema = mongoose.Schema
var slug = require('mongoose-slug-generator')

var mongooseDelete = require('mongoose-delete')

const Supplies = new Schema({
    tendoitac:  { type: String, default: '0' },
    diachi: { type: String, default: '0' },
    sdt: { type: String, default: '0' },
    slug: { type: String, slug: 'tendoitac', unique: true},
  },{timestamps: true,});

  //Plugin
mongoose.plugin(slug)
Supplies.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})


module.exports = mongoose.model('supplies', Supplies)