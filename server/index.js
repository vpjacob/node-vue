const express = require('express')

const app = express()

app.set('secret','123')

app.use(require('cors')())
app.use(express.json())

app.use('/admin',express.static(__dirname + '/admin'))
app.use('/',express.static(__dirname + '/build'))

app.use('/uploads',express.static(__dirname + '/uploads'))

require('./router/admin')(app)
require('./router/chart')(app)

require('./plugins/db')(app)
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})