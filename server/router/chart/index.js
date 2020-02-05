module.exports = app => {
    const express = require('express')
    const _ = require('lodash')
    
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../modles/AdminUser')
    const Chart = require('../../modles/Chart')
    const StockInfo = require('../../modles/StockInfo')

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
        res.send({
            success: true,
            modle
        })
    })


    app.post('/chart/api/get_chart_list', async (req, res) => {
        // Chart
        const items = await Chart.find().sort({ datetime: -1 })
        res.send({
            success: true,
            list: items
        })
    })

    // 删除某一条错误的数据
    app.post('/chart/api/delete_item', async (req, res) => {
        const items = await Chart.findByIdAndDelete(req.body.id)
        res.send({
            success: items ? true : false,
        })
    })
    
    /**
     *    创建图标数据   
    rongzi: { type: String },
    hugangtong: { type: String },
      datetime: '',
     */
    app.post('/chart/api/get_stock_chart', async (req, res) => {
        const items = await StockInfo.find().sort({ datetime: 1 })
        let rongzi= [], hugangtong= [],datetime= [];
        _.map(items,(item,)=>{
            rongzi = _.concat(rongzi,item.rongzi)
            hugangtong = _.concat(hugangtong,item.hugangtong)
            datetime = _.concat(datetime,item.datetime)
        });
        const option1 = {
            title: {
                text: '融资融券余额',
                subtext: '单位：亿元'
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
                data: datetime
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 人'
                }
            },
            series: [
                
                {
                    name: '余额',
                    type: 'line',
                    data: rongzi,
                    markPoint: {
                        data: [
                            { name: '最低', value: -2, xAxis: 1, yAxis: -1.5 }
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
                }
            ]
        };
        const option2 = {
            title: {
                text: '北上资金流入流出',
                subtext: '单位：亿元'
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
                data: datetime
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 人'
                }
            },
            series: [
                
                {
                    name: '金额',
                    type: 'line',
                    data: hugangtong,
                    markPoint: {
                        data: [
                            { name: '最低', value: -2, xAxis: 1, yAxis: -1.5 }
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
            option1,option2,
            success:true,
        })
    })

    /**
     *    创建图标数据   
      suspected: 0,//疑似
      definite: 0,//确诊
      death: 0,//死亡
      discharge: 0,//出院
      datetime: '',
     */
    app.post('/chart/api/get_chart_data', async (req, res) => {
        const items = await Chart.find().sort({ datetime: 1 })
        let suspected= [], definite= [],death= [],discharge= [] ,datetime= [];
        _.map(items,(item,)=>{
            suspected = _.concat(suspected,item.suspected)
            definite = _.concat(definite,item.definite)
            death = _.concat(death,item.death)
            discharge = _.concat(discharge,item.discharge)
            datetime = _.concat(datetime,item.datetime)
        });
        const option1 = {
            title: {
                text: '病情变化增速',
                subtext: '确诊和疑似'
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
                data: datetime
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
                    data: suspected,
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
                    data: definite,
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
                }
            ]
        };
        const option2 = {
            title: {
                text: '病情变化增速',
                subtext: '出院和死亡'
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
                data: datetime
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 人'
                }
            },
            series: [
                {
                    name: '死亡',
                    type: 'line',
                    data: death,
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
                    name: '治愈',
                    type: 'line',
                    data: discharge,
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
            option1,option2,
            success:true,
        })
    })

    // 错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}