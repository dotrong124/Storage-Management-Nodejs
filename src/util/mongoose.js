module.exports = {
    multipleMoongoseToObject: function (mongooses){
        return mongooses.map(mongoose => mongoose.toObject())
    },
    moongoseToObject: function (mongoose){
        return mongoose ? mongoose.toObject(): mongoose
    }
}
