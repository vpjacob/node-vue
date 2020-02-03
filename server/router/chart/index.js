module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../modles/AdminUser')
    const Chart = require('../../modles/Chart')
    const assert = require('http-assert')

    const router = express.Router({
        mergeParams: true
    })
    router.post('/', async (req, res) => {
        const modle = await req.Model.create(req.body)
        res.send(modle)
    })


    // 资源列表
    // router.get('/', async (req, res) => {
    //     let queryOptions = {}
    //     if (req.Model.modelName === 'Category') {
    //         queryOptions.populate = 'parent'
    //     }
    //     const items = await req.Model.find().setOptions(queryOptions).limit(10)
    //     res.send(items)
    // })
    // 资源详情
    // router.get('/:id', async (req, res) => {
    //     const model = await req.Model.findById(req.params.id)
    //     res.send(model)
    // })
    // 更新资源
    // router.put('/:id', async (req, res) => {
    //     const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    //     res.send(model)
    // })
    // // 删除资源
    // router.delete('/:id', async (req, res) => {
    //     await req.Model.findByIdAndDelete(req.params.id, req.body)
    //     res.send({
    //         success: true
    //     })
    // })

    const authMiddleware = require('../../middleware/auth')
    // const resourceMiddleware = require('../../middleware/resource')
    app.use('/chart/api', router)
    // app.use('/chart/api', authMiddleware(), router)


    // 上传文件
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        let file = req.file
        file.url = `http://39.106.18.19/uploads/${file.filename}`
        // file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    // 登录
    app.post('/chart/api/login', async (req, res) => {
        const { password, username } = req.body
        console.log('password', password, username)
        const user = await AdminUser.findOne({ username }).select('+password')
        assert(user, 422, '用户不存在')
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 423, '密码错误')

        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    app.post('/chart/api/creat_chart_data', async (req, res) => {
        // Chart
        const modle = await Chart.create(req.body)
        console.log('=xxxxx',req.body)
        res.send({
            success:true,
            modle
        })
    })

    
    app.post('/chart/api/get_chart_list', async (req, res) => {
        // Chart
        const items = await Chart.find()
        res.send({
            success:true,
            list:items
        })
    })

    // 创建数据
    app.post('/chart/api/get_chart_data', async (req, res) => {
        
        
        const option = {
            title: {
                text: '病情变化',
                subtext: '自己记录'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['最高气温', '最低气温']
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    // restore: {},
                    // saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 人'
                }
            },
            series: [
                {
                    name: '疑似',
                    type: 'line',
                    data: [11, 11, 15, 93, 12, 13, 10],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                },
                {
                    name: '确诊',
                    type: 'line',
                    data: [1, -2, 2, 5, 3, 2, 0],
                    markPoint: {
                        data: [
                            { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' },
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                },
                {
                    name: '确诊',
                    type: 'line',
                    data: [11, -12, 12, 195, 13, 2, 1],
                    markPoint: {
                        data: [
                            { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' },
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                },

            ]
        };


        res.send({
            option
        })
    })

    // 错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}