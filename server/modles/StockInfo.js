const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    rongzi: { type: String },
    hugangtong: { type: String },

    datetime:{ type: String },

})

module.exports = mongoose.model('StockInfo', schema)