import React, { Component } from "react";
import * as _ from 'lodash'
import { postFetch } from "../utils/http";
import { Statistic, Card, Row, Col, Button, Modal, message } from 'antd';
export default class TopicsPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      list: [],
      modalVisible: false,
      selectedId: '',
    }
  }
  componentDidMount() {
    this.featchData()
  }
  featchData = () => {
    postFetch('/get_chart_list', {
    }).then(
      (data) => {
        this.setState({
          list: data.list
        })
      }
    )

  }
  setmodalVisible(modalVisible) {
    this.setState({ modalVisible });
  }
  deleteItem() {
    const { selectedId } = this.state
    postFetch('/delete_item', {
      id: selectedId,
    }).then(
      (data) => {
        if (data.success) {
          this.featchData()
          return message.info('删除成功');
        }
        message.info('删除错误');
      }
    )
  }

  render() {
    return (
      <div>
        {_.map(this.state.list, (item, index) => {
          return (
            <div key={index} style={{ flex: 1, flexDirection: 'row', padding: 20, margin: 10, backgroundColor: 'blue', borderRadius: 10, justifyContent: 'center', }}>
              <div style={{ flex: 1, color: 'white', marginBottom: 10, }}>{'时间:' + _.get(item, 'datetime', 0)}</div>
              <Row gutter={16}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="疑似"
                      value={_.get(item, 'suspected', 0)}
                      valueStyle={{ color: '#3f8600' }}
                      suffix="人"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card >
                    <Statistic
                      title="确诊"
                      value={_.get(item, 'definite', 0)}
                      valueStyle={{ color: 'red' }}
                      suffix="人"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="死亡"
                      value={_.get(item, 'death', 0)}
                      valueStyle={{ color: 'blue' }}
                      suffix="人"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="出院"
                      value={_.get(item, 'discharge', 0)}
                      valueStyle={{ color: 'green' }}
                      suffix="人"
                    />
                  </Card>
                </Col>
              </Row>
              <div style={{ flex: 1, color: 'white', marginTop: 10, }}>
                <Button type="primary" onClick={() => {
                  this.setmodalVisible(true)
                  this.setState({ selectedId: item._id })
                }}>删除记录</Button>
              </div>

            </div>
          )
        })}
        <Modal
          title="Vertically centered modal dialog"
          centered
          visible={this.state.modalVisible}
          onOk={() => {
            this.setmodalVisible(false)
            this.deleteItem()

          }}
          onCancel={() => this.setmodalVisible(false)}
        >
          <p>确定删除吗...</p>
          <p>确定删除吗...</p>
          <p>确定删除吗...</p>
        </Modal>

      </div>

    );

  }
}
