var mongoose = require('mongoose');
var Schema = mongoose.Schema
var slug = require('mongoose-slug-generator')

var mongooseDelete = require('mongoose-delete')

const Staff = new Schema({
    tennhanvien:  { type: String, default: '0' },
    cmnd: { type: String, default: '0' },
    sdt: { type: String, default: '0' },
    luong: { type: String, default: '0' },
    kho: { type: mongoose.Schema.Types.ObjectId, ref:'storages' },
    mota: { type: String, default: '0' },
    gioitinh: { type: String, default: '0' },
    ngaysinh: { type: String, default: '0' },
    slug: { type: String, slug: 'tennhanvien', unique: true},
  },{timestamps: true,});

  //Plugin
mongoose.plugin(slug)
Staff.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})


module.exports = mongoose.model('staffs', Staff)