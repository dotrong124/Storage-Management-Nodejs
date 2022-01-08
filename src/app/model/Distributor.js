var mongoose = require('mongoose');
var Schema = mongoose.Schema
var slug = require('mongoose-slug-generator')

var mongooseDelete = require('mongoose-delete')

const Distributor = new Schema({
    tendoitac:  { type: String, default: '0' },
    diachi: { type: String, default: '0' },
    sdt: { type: String, default: '0' },
    slug: { type: String, slug: 'tendoitac', unique: true},
  },{timestamps: true,});

  //Plugin
mongoose.plugin(slug)
Distributor.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})


module.exports = mongoose.model('distributors', Distributor)