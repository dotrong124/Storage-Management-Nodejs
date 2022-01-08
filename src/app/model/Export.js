const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator')

var mongooseDelete = require('mongoose-delete')

const Export = new Schema({
    exportname: { type: String, default: 'donhang'},
    chiphi:{ type:  Array, default: '0'},
    m3: { type: Array, default: '0'},
    khoiluong: { type: Array, default: '0'},
    kho: { type: Array, default: '0'},
    tensanpham: { type:Array, default: '0'},
    slug: { type: String,  slug: 'exportname', unique: true },
    tendoitac:{ type: mongoose.Schema.Types.ObjectId, ref:'distributors'},
    soluong: {type: Array, default: '0'},
    phuphi: {type: String, default: '0'},
    tienvanchuyen: {type: String, default: '0'},
    tongm3: {type: String, default: '0'},
    tongsoluong: { type: String, default: '0'},
    tongkhoiluong: { type: String, default: '0'},
    tongchiphi: { type: String, default: '0'},
    tongm3loai: { type: Array, default: '0'},
    tongkhoiluongloai: { type: Array, default: '0'},
    tongchiphiloai: { type: Array, default: '0'},
    userId:{ type: mongoose.Schema.Types.ObjectId, ref:'accounts'},
  }, {timestamps: true});

  //Plugin
mongoose.plugin(slug)
Export.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})
// login.index({ first: 1, last: -1 }) Nơi đánh index
module.exports = mongoose.model('exports', Export)