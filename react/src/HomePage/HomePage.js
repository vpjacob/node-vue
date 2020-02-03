import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ReactEcharts from 'echarts-for-react';
import {postFetch} from '../utils/http'
import 'antd/dist/antd.css';
const { Content, Sider } = Layout;
const { SubMenu } = Menu;


const div1 = {
  flex: 1,

};
const option = {
  title: {
    text: '未来一周气温变化',
    subtext: '纯属虚构'
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
      restore: {},
      saveAsImage: {}
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
      formatter: '{value} °C'
    }
  },
  series: [
    {
      name: '最高气温',
      type: 'line',
      data: [11, 11, 15, 13, 12, 13, 10],
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
      name: '最低气温',
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
    }
  ]
};
export default class HomePage extends Component {

  componentDidMount() {
    var storage=window.localStorage

    console.log('====',storage.getItem('token'))
    postFetch('/login', {
      username:'vpjacob',
      password:'123456', 
    }).then(
      (data) => {
        // console.log(data.token)
        storage.setItem('token',data.token)
      }
    )
  }

  render() {

    return (

      <Layout>

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      subnav 1
                </span>
                  }
                >
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      subnav 2
                </span>
                  }
                >
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                      subnav 3
                </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <ReactEcharts
                option={option}
                style={{ height: '350px', width: '1000px' }}
                className='react_for_echarts' />
            </Content>
          </Layout>
        </Content>

      </Layout>
    );
  }

}
