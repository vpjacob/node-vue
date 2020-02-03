import React, { Component } from "react";
import * as _ from 'lodash'
import { postFetch } from "../utils/http";
export default class TopicsPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      list: [],
    }
  }
  componentDidMount() {
    postFetch('/get_chart_list', {
    }).then(
      (data) => {
        console.log('===data', data)
        this.setState({
          list: data.list
        })
      }
    )

  }


  render() {
    return (
      <div>
        {_.map(this.state.list, (item, index) => {
          return (
          <div key={index} style={{flex:1,flexDirection:'row',marginBottom: 20,}}>
            <div style={{flex:1}}>{'疑似:' + _.get(item, 'suspected', 0)}</div>
            <div style={{flex:1}}>{'确诊:' + _.get(item, 'definite', 0)}</div>
            <div style={{flex:1}}>{'死亡:' + _.get(item, 'death', 0)}</div>
            <div style={{flex:1}}>{'出院:' + _.get(item, 'discharge', 0)}</div>
            <div style={{flex:1}}>{'时间:' + _.get(item, 'datetime', 0)}</div>
          </div>
          )
        })}
      </div>

    );

  }
}
