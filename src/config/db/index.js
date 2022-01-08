var mongoose = require('mongoose')
async function connect() {
    
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/QLSX',{
            useNewUrlParser: true,
            UseUnifiedTopology: true,
        });
        console.log('Thanh cong')
    } catch (error) {
        console.log('That bai',error)
    }
}

module.exports = { connect }