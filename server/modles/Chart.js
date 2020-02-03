const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    suspected:{ type: Number },//疑似
    definite:{ type: Number },//确诊
    death:{ type: Number },//死亡
    discharge:{ type: Number },//出院
    datetime:{ type: String },
})

module.exports = mongoose.model('Chart', schema)