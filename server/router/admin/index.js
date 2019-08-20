module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    const Category = require('../../modles/Category')
    router.post('/categories',async (req,res)=>{
        const modle = await Category.create(req.body)
        res.send(modle)
    })

    app.use('/admin/api',router)
}