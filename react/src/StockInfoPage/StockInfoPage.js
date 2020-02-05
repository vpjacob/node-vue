import React, { Component } from "react";
import { Layout, } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { postFetch } from '../utils/http'
import 'antd/dist/antd.css';
import * as _ from 'lodash'

const { Content, } = Layout;

export default class StockInfoPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      option1: {},
      option2: {},
    }
  }


  componentDidMount() {
    // var storage=window.localStorage
    postFetch('/get_stock_chart', {
    }).then(
      (data) => {
        // storage.setItem('token',data.token)
        this.setState({
          option1: _.get(data, 'option1', {}),
          option2: _.get(data, 'option2', {}),
        })
      }
    )
  }

  render() {
    return (
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <ReactEcharts
                option={this.state.option1}
                style={{ height: '500px', width: '90%' }}
                className='react_for_echarts' />

              <ReactEcharts
                option={this.state.option2}
                style={{ height: '500px', width: '90%' }}
                className='react_for_echarts' />
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
