var mongoose = require('mongoose');
var Schema = mongoose.Schema
var slug = require('mongoose-slug-generator')

var mongooseDelete = require('mongoose-delete')

const Item = new Schema({
    tennguyenlieu: { type: String, minlength: 1, default: 'tennguyenlieu'},
    soluong: { type: String, default: '0' },
    chiphi: { type: String, default: '0' },
    khoiluong: { type: String, default: '0' },
    hinhanh: { type: String, default: '0'},
    slug: { type: String, slug: 'tennguyenlieu', unique: true},
    kho: { type: mongoose.Schema.Types.ObjectId, ref:'storages' },
    mota: { type: String, default: '0'},
    tendoitac:{ type: mongoose.Schema.Types.ObjectId, ref:'supplies' },
    userId:  { type: mongoose.Schema.Types.ObjectId, ref:'accounts' }
  }, {timestamps: true,});

  //Plugin
mongoose.plugin(slug)
Item.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('items', Item)