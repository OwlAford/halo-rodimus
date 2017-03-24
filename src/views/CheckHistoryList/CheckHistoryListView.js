import React, { Component } from 'react'
import { Button, Table, DatePicker, Modal } from 'antd'
// import moment from 'moment'
import { formatDateTime } from 'UTIL/filters'

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
    this.props.getHistoryList({
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
    const { getHistoryList, historyList, historyListSelectOpt, totalNum } = this.props

    const columns = [{
      title: '授权流水号',
      dataIndex: 'hisId',
      key: 'hisId'
    }, {
      title: '审批流水号',
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
      title: '授权人编号',
      dataIndex: 'cstNo',
      key: 'cstNo'
    }, {
      title: '授权人姓名',
      dataIndex: 'cstName',
      key: 'cstName'
    }, {
      title: '授权结果',
      dataIndex: 'authFlag',
      key: 'authFlag',
      render: (text, record) => text == '0' || text == 0 ? <span>同意</span> : <span>驳回</span>
    }, {
      title: '授权时间',
      dataIndex: 'authTime',
      key: 'authTime',
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
      current: Number(historyListSelectOpt.currentPage),
      showSizeChanger: true,
      pageSize: Number(historyListSelectOpt.turnPageShowNum),
      onShowSizeChange: (current, pageSize) => {
        getHistoryList({
          currentPage: 1,
          turnPageShowNum: pageSize,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        })
      },
      onChange: (current) => {
        getHistoryList({
          currentPage: current,
          turnPageShowNum: historyListSelectOpt.turnPageShowNum,
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
      getHistoryList({
        currentPage: 1,
        turnPageShowNum: historyListSelectOpt.turnPageShowNum,
        beginTime: start,
        endTime: end
      })
    }

    // 今日以后的未来日子不允许选择
    const disabledDate = current => current && current.valueOf() > Date.now()

    const formatStr = str => {
      let paramsArr = str.split(',')
      let jsonArr = []
      paramsArr.map(item => {
        let tmp = {}
        let li = item.split('=')
        let key = li[0]
        let val = li[1]
        key ? null : key = '未知'
        if (val) {
          tmp.key = key
          val.indexOf(':') > 0 ? val = val.replace(/:/g, '， ') : null
          tmp.value = val
          jsonArr.push(tmp)
        } else {
          jsonArr.push({
            key: key,
            value: '暂无'
          })
        }
      })
      return jsonArr
    }  

    const formatForm = str => formatStr(str).map((item, i) => {
      return (
        <tr key={i}>
          <td style={{ padding: '5px 0', textAlign: 'right', fontWeight: 'bold' }}>{item.key}：</td>
          <td style={{ padding: '5px 0' }}>{item.value}</td>
        </tr>
      )
    })

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
            rowKey='hisId'
            bordered
            columns={columns}
            dataSource={historyList}
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
            <table>
              <tbody>
                {formatForm(this.state.detailparams)}
              </tbody>
            </table>
          </div>
        </Modal>
      </div>
    )
  }

}