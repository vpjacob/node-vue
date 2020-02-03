import React, { Component } from "react";
import { Layout, InputNumber, Button ,message, DatePicker} from 'antd';
import { postFetch } from '../utils/http'
import 'antd/dist/antd.css';
const { Content } = Layout;
export default class CreatPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      suspected: 0,//疑似
      definite: 0,//确诊
      death: 0,//死亡
      discharge: 0,//出院
      datetime: '',
    }
  }


  componentDidMount() {
    
  }
  onChange = (value,type) => {
    
    this.setState({
      [type]:value
    });
    
  }

  submitPress = () => {
    const { suspected, definite,death,discharge,datetime} = this.state
    if(datetime === ''){
      return message.info('请选择时间');
    }
    postFetch('/creat_chart_data', {
      suspected,//疑似
      definite,//确诊
      death,//死亡
      discharge,//出院
      datetime,
    }).then(
      (data) => {
        if(data.success){
          return message.info('创建成功');
        }
        message.info('创建错误');
      }
    )
  }

  render() {
    return (
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <div style={{ flexDirection: 'row', margin: 20, }}>
                <div style={{ marginRight: 10 }}>{'疑似病例'}</div>
                <InputNumber min={0} max={1000000} defaultValue={0} onChange={(value) => this.onChange(value,'suspected')} />
              </div>
              <div style={{ flexDirection: 'row', margin: 20, }}>
                <div style={{ marginRight: 10 }}>{'确诊病例'}</div>
                <InputNumber min={0} max={1000000} defaultValue={0} onChange={(value) => this.onChange(value,'definite')} />
              </div>
              <div style={{ flexDirection: 'row', margin: 20, }}>
                <div style={{ marginRight: 10 }}>{'死亡病例'}</div>
                <InputNumber min={0} max={1000000} defaultValue={0} onChange={(value) => this.onChange(value,'death')} />
              </div>
              <div style={{ flexDirection: 'row', margin: 20, }}>
                <div style={{ marginRight: 10 }}>{'治愈病例'}</div>
                <InputNumber min={0} max={1000000} defaultValue={0} onChange={(value) => this.onChange(value,'discharge')} />
              </div>
              <div style={{ flexDirection: 'row', margin: 20, }}>
                <div style={{ marginRight: 10 }}>{'选择日期'}</div>
                <DatePicker onChange={(date, dateString) => this.onChange(dateString,'datetime')} />
              </div>

              <br/>

              <div style={{ flexDirection: 'row', margin: 20, }}>
                <Button onClick={() => this.submitPress()} type="primary">提交</Button>
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
