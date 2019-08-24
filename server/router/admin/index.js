module.exports = app =>{
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })
    router.post('/',async (req,res)=>{
        const modle = await req.Model.create(req.body)
        res.send(modle)
    })
    router.get('/',async (req,res)=>{
        let queryOptions = {}
        if (req.Model.modelName === 'Category') {
          queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    router.get('/:id',async (req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.put('/:id',async (req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/:id',async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    app.use('/admin/api/rest/:resource',async (req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../modles/${modelName}`)
        next()
    },router)

    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', upload.single('file'),async(req,res)=>{
        let file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login',async (req,res)=>{
        const {password,username} = req.body
        const AdminUser = require('../../modles/AdminUser')
        const user = await AdminUser.findOne({username}).select('+password')
        if(!user){
            return res.status(422).send({message:'用户不存在'})
        }
        const isValid = require('bcrypt').compareSync(password, user.password)
        if (!isValid) {
            return res.status(422).send({
              message: '密码错误'
            })
          }
          
        const jwtoken = require('jsonwebtoken')
        const token = jwtoken.sign({id:user._id},app.get('secret'))
        res.send({token})
    })

}