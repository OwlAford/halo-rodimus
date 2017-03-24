import React, { Component } from 'react'
import { Row, Col, Table, Button, Modal } from 'antd'
import InputSearch from 'COMPONENT/InputSearch'
import DetailBox from './DetailBox'
import RelSetBox from './RelSetBox'
import Spin from 'COMPONENT/Spin'
import { checkBtn } from 'UTIL/authButton'


export default class ReviewSettingsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: 'detail',
      modalDetailInfo: {},
      modalRelSetInfo: {},
      loading: false
    }
    this.onSearch = this.onSearch.bind(this)
  }

  showSpin() {
    this.setState({
      loading: true
    })
  }
  
  hideSpin() {
    this.setState({
      loading: false
    })
  }

  initTable() {
    this.props.getBsnList({
      currentPage: 1,
      turnPageShowNum: 10,
      bsnName: ''
    })
  }

  onCloseModal() {
    this.setState({
      modalVisible: false
    })
  } 

  onSearch(bsnName) {
    const { getBsnList, bsnSelectOpt } = this.props
    getBsnList({
      currentPage: 1,
      turnPageShowNum: bsnSelectOpt.turnPageShowNum,
      bsnName: bsnName
    })
  }

  setRelStrategy(info) {
    this.setState({
      modalVisible: true,
      modalType: 'set',
      modalRelSetInfo: info
    })
  }

  viewRelStrategy(info) {
    this.showSpin()
    this.props.getStrategy(info.authId, () => {
      this.setState({
        modalVisible: true,
        modalType: 'detail',
        modalDetailInfo: info
      }, () => {
        this.hideSpin()
      })
    })
  }

  componentWillMount() {
    this.initTable()
    this.props.getStrategyList({
      currentPage: 1,
      turnPageShowNum: 10
    })
  }

  render() {
    const { userMenu, bsnList, getBsnList, bsnListTotalNum, bsnSelectOpt } = this.props
    const { modalVisible, modalType, modalRelSetInfo, modalDetailInfo } = this.state

    const columns = [{
      title: '交易编号',
      dataIndex: 'bsnCode',
      key: 'bsnCode'
    }, {
      title: '接口编号',
      dataIndex: 'tranCode',
      key: 'tranCode'
    }, {
      title: '交易名称',
      dataIndex: 'bsnName',
      key: 'bsnName'
    }, {
      title: '关联策略名称',
      dataIndex: 'alias',
      key: 'alias',
      render: (text, record) => {
        return <a onClick={e => this.viewRelStrategy(record)}>{text}</a>
      }
    }, {
      title: '关联策略设置',
      key: 'relation',
      render: (text, record) => {
        return checkBtn(userMenu, 'F009', <a onClick={e => this.setRelStrategy(record)}>设置</a>)
      }
    }]

    const pagination = {
      total: Number(bsnListTotalNum),
      current: Number(bsnSelectOpt.currentPage),
      showSizeChanger: true,
      pageSize: Number(bsnSelectOpt.turnPageShowNum),
      onShowSizeChange: (current, pageSize) => {
        getBsnList({
          currentPage: 1,
          turnPageShowNum: pageSize,
          bsnName: bsnSelectOpt.bsnName
        })
      },
      onChange: current => {
        getBsnList({
          currentPage: current,
          turnPageShowNum: bsnSelectOpt.turnPageShowNum,
          bsnName: bsnSelectOpt.bsnName
        })
      }
    }

    return (
      <div className="pageReviewSettings">
        <div style={{ padding: '20px 20px 20px 30px', height: '72px' }}>
          <Button onClick={e => this.initTable()}>重置</Button>
          <div style={{ float: 'right' }}>
            <InputSearch
              placeholder='请输入交易名称'
              initialValue=''
              onSearch={this.onSearch}
            />
          </div>
        </div>
        <div className='app-narrow-table' style={{ padding: '0 30px' }}>
          <Table 
            rowKey='tranCode'
            columns={columns} 
            dataSource={bsnList} 
            pagination={pagination} 
            bordered
          />
        </div>
        <Modal
          visible={modalVisible}
          title={modalType == 'detail' ? '策略详情' : '设置策略'}
          onCancel={() => this.onCloseModal()}
          width={1000}
          footer={[
            <Button 
              key="back" 
              type="ghost" 
              size="large"  
              onClick={() => this.onCloseModal()}
            >
              退出
            </Button>
          ]}
        >
          {
            modalType == 'detail' ? 
            <DetailBox info={modalDetailInfo}/> : 
            <RelSetBox info={modalRelSetInfo}/>
          }
        </Modal>
        <Spin loading={this.state.loading}/>
      </div>
    )
  }

}