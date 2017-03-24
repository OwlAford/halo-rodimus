import React, { Component } from 'react'
import { Button, Table, DatePicker, Modal } from 'antd'
// import moment from 'moment'
import InfoTable from 'COMPONENT/InfoTable'
import { formatDateTime, str2json } from 'UTIL/filters'

const RangePicker = DatePicker.RangePicker

export default class ApplyHistoryListView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      beginTime: '',
      endTime: '',
      showDetail: false,
      detailparams: ''
    }
  }

  resetStateList() {
    this.props.getStateList({
      currentPage: 1,
      turnPageShowNum: 10,
      beginTime: '',
      endTime: ''
    })
  }

  initTable() {
    this.setState({
      beginTime: '',
      endTime: ''
    })
    this.resetStateList()
  }

  stateReview(data) {
    this.setState({
      showDetail: true,
      detailparams: data.flowDetail
    })
  }

  onCloseModal() {
    this.setState({
      showDetail: false
    })
  }

  componentWillMount() {
    this.resetStateList()
  }

  render() {
    const { getStateList, stateList, stateListSelectOpt, totalNum } = this.props

    const columns = [{
      title: '申请流水号',
      dataIndex: 'flowId',
      key: 'flowId'
    }, {
      title: '交易编号',
      dataIndex: 'bsnCode',
      key: 'bsnCode'
    }, {
      title: '交易名称',
      dataIndex: 'bsnName',
      key: 'bsnName',
      render: (text, record) => {
        return <a onClick={e => this.stateReview(record)}>{text}</a>
      }
    }, {
      title: '授权结果',
      dataIndex: 'authFlag',
      key: 'authFlag',
      render: (text, record) => {
        return text == '1' || text == 1 ? <span>进行中</span> : text == '0' || text == 0 ? <span>通过</span> : <span>驳回</span>
      }
    }, {
      title: '授权时间',
      dataIndex: 'applyDate',
      key: 'applyDate',
      render(text, record) {
        return(<span>{formatDateTime(text)}</span>)
      }
    }, {
      title: '驳回原因',
      dataIndex: 'rejReason',
      key: 'rejReason'
    }]

    const pagination = {
      total: Number(totalNum),
      current: Number(stateListSelectOpt.currentPage),
      showSizeChanger: true,
      pageSize: Number(stateListSelectOpt.turnPageShowNum),
      onShowSizeChange: (current, pageSize) => {
        getStateList({
          currentPage: 1,
          turnPageShowNum: pageSize,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        })
      },
      onChange: current => {
        getStateList({
          currentPage: current,
          turnPageShowNum: stateListSelectOpt.turnPageShowNum,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        })
      }
    }

    const onChangeTime = (dates, dateStrings) => {
      const start = dateStrings[0].replace(/-/g, '')
      const end = dateStrings[1].replace(/-/g, '')
      this.setState({
        beginTime: start,
        endTime: end
      })
      getStateList({
        currentPage: 1,
        turnPageShowNum: stateListSelectOpt.turnPageShowNum,
        beginTime: start,
        endTime: end
      })
    }

    // 今日以后的未来日子不允许选择
    const disabledDate = current => current && current.valueOf() > Date.now()

    return (
      <div className="applyHistoryList" style={{ padding: '20px 30px' }}>
        <div style={{ width: '100%', paddingBottom: '20px', height: '48px' }}>
          <Button onClick={e => this.initTable()}>重置</Button>
          <RangePicker
            style={{float: 'right'}}
            // ranges={{ 
            //   '今日': [moment(), moment()], 
            //   '本月': [moment(), moment().endOf('month')] 
            // }}
            format="YYYY-MM-DD" 
            disabledDate={disabledDate}
            onChange={onChangeTime}
          />
        </div>
        <div className='app-narrow-table'>
          <Table
            rowKey='flowId'
            bordered
            columns={columns}
            dataSource={stateList}
            pagination={pagination}
          />
        </div>
        <Modal
          visible={this.state.showDetail}
          title="交易详情"
          onCancel={e => this.onCloseModal()}
          footer={[
            <Button 
              key="back" 
              type="ghost" 
              size="large"  
              onClick={e => this.onCloseModal()}
            >
              关闭
            </Button>
          ]}
        >
          <div style={{ padding: '0 20px' }}>
            <InfoTable
              data={str2json(this.state.detailparams)}
            /> 
          </div>
        </Modal>
      </div>
    )
  }

}