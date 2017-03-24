import React, { Component } from 'react'
import { Table } from 'antd'


export default class RelSetBoxView extends Component {
  
  constructor(props) {
    super(props)
  }

  setRelStrgy(record) {
    this.props.setRelation({
      bsnCode: this.props.info.bsnCode,
      authId: record.authId
    })
  }


  render() {
    const { info, strategyList, getStrategyList, totalNum, strategyListSelOpt } = this.props

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
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => <a onClick={e => this.setRelStrgy(record)}>设置关联</a>
    }]

    const pagination = {
      total: Number(totalNum),
      current: Number(strategyListSelOpt.currentPage),
      showSizeChanger: true,
      pageSize: Number(strategyListSelOpt.turnPageShowNum),
      onShowSizeChange: (current, pageSize) => {
        getStrategyList({
          currentPage: 1,
          turnPageShowNum: pageSize,
          bsnName: strategyListSelOpt.bsnName
        })
      },
      onChange: (current) => {
        getStrategyList({
          currentPage: current,
          turnPageShowNum: strategyListSelOpt.turnPageShowNum,
          bsnName: strategyListSelOpt.bsnName
        })
      }
    }

    return (
      <div className="relSetBox">
        <h4 style={{ paddingBottom: '15px' }}>交易名称：{info.bsnName}</h4>
        <div className='app-narrow-table'>
          <Table
            rowKey='authId'
            bordered
            columns={columns}
            dataSource={strategyList}
            pagination={pagination}
          />
        </div>
      </div>
    )
  }
}
