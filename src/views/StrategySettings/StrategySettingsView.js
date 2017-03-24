import React, { Component } from 'react'
import { Button, Table, Modal } from 'antd'
import StrategyAddEditBox from './StrategyAddEditBox'
import { checkBtn, checkBtnList } from 'UTIL/authButton'

const confirm = Modal.confirm

export default class StrategySettingsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalType: 'add',
      initVal: null
    }
  }

  showModal() {
    this.props.setAddEditModalVisible(true)
  }

  addPolicy() {
    this.showModal()
    this.setState({
      modalType: 'add',
      initVal: null
    })
  }

  modStrategy(info) {
    this.showModal()
    this.setState({
      modalType: 'edit',
      initVal: info
    })
  } 

  delStrategy(info) {
    confirm({
      title: '删除策略',
      content: '是否确认删除策略？',
      onOk: () => {
        this.props.deleteStrategy(info)
      }
    })
  } 

  componentWillMount() {
    this.props.getStrategyList({
      currentPage: 1,
      turnPageShowNum: 10
    })
  }

  render() {
    const { userMenu, strategyList, getStrategyList, totalNum, strategyListSelOpt, addEditBoxVisible } = this.props
    const { modalType, initVal } = this.state
    const addBtn = (
      <Button 
        size="large" 
        type="primary" 
        icon="plus-circle-o"
        onClick={e => this.addPolicy()}
      >
        新增策略
      </Button>
    )

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
        render: (text, record) => {
          return checkBtnList(userMenu, [{
            item: 'F002',
            button: <a onClick={e => {this.modStrategy(record)}}>修改</a>
          }, {
            item: 'F004', 
            button: <a onClick={e => {this.delStrategy(record)}}>删除</a>
          }])
        }
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
      <div className="pagePolicySettings">
        <div style={{padding: '20px 30px', textAlign: 'right'}}>
          {checkBtn(userMenu, 'F001', addBtn)}
        </div>
        <div className='app-narrow-table' style={{ padding: '0 30px' }}>
          <Table
            rowKey='authId'
            bordered
            columns={columns}
            dataSource={strategyList}
            pagination={pagination}
          />
        </div>
        {
          addEditBoxVisible ? 
          <StrategyAddEditBox 
            modalType={modalType} 
            initVal={initVal} 
          /> : 
          null
        }
      </div>
    )
  }

}