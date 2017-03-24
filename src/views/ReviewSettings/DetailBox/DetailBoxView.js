import React, { Component } from 'react'
import { Table } from 'antd'


export default class DetailBoxView extends Component {
  
  render() {
    const { info, detail } = this.props

    const columns = [{
      title: '策略编号',
      dataIndex: 'authId',
      key: 'authId'
    }, {
      title: '策略名称',
      dataIndex: 'alias',
      key: 'alias'
    }, {
      title: '授权方式',
      dataIndex: 'authType',
      key: 'authType',
      render: (text, record) => {
        return text == '0' || text == 0 ? <span>无序</span> : <span>有序</span>
      }
    }, {
      title: '授权定义',
      children: [{
        title: '一级',
        dataIndex: 'add1',
        key: 'add1'
      }, {
        title: '二级',
        dataIndex: 'add2',
        key: 'add2'
      }, {
        title: '三级',
        dataIndex: 'add3',
        key: 'ad3'
      }, {
        title: '四级',
        dataIndex: 'add4',
        key: 'add4'
      }, {
        title: '五级',
        dataIndex: 'add5',
        key: 'add5'
      }]
    }]

    let dataSource = []
    if (detail.alias) {
      dataSource.push(Object.assign({}, detail, {
        key: 1
      }))
    }

    return (
      <div className="detailBox">
        <h4 style={{ paddingBottom: '15px' }}>交易名称：{info.bsnName}</h4>
        <div className='app-narrow-table'>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      </div>
    )
  }
}
