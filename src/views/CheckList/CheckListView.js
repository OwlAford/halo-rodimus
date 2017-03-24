import React, { Component } from 'react'
import { Form, Button, Table, Modal, Input, message } from 'antd'
import { checkBtnList } from 'UTIL/authButton'
import { str2json } from 'UTIL/filters'
import InfoTable from 'COMPONENT/InfoTable'
import Spin from 'COMPONENT/Spin'
const FormItem = Form.Item

const CheckList = class CheckListView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      modalVisible: false,
      reviewVisible: false,
      type: 'agree',
      currentItem: {},
      currentDetail: ''
    }
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

  applyDecide(data) {
    this.showSpin()
    this.props.checkDecide(data, () => this.closeModal(), () => this.closeModal())
  }

  checkSubmit() {
    const { currentItem, type } = this.state
    const { getFieldValue, validateFields, resetFields } = this.props.form
    let data = {
      bsnCode: currentItem.bsnCode,
      authFlag: 0,
      actionType: 1,
      flowId: currentItem.flowId
    }

    if (type != 'agree') {
      validateFields((errors, values) => {
        if (!!errors) {
          message.error('填写内容有错误，请仔细填写!')
        } else {
          const rejReason = getFieldValue('rejReason')
          Object.assign(data, {
            authFlag: 1,
            rejReason: rejReason
          })
          this.applyDecide(data)
        }
      })
    } else {
      this.applyDecide(data) 
    }
  }

  openRejectModal(info) {
    this.setState({
      modalVisible: true,
      currentItem: info,
      type: 'reject'
    })
  }

  openAgreeModal(info) {
    console.log(info)
    this.setState({
      modalVisible: true,
      currentItem: info,
      type: 'agree'
    })
  }

  closeModal() {
    this.setState({
      modalVisible: false,
      currentItem: {}
    })
    this.hideSpin()
    this.props.form.resetFields()
  }

  checkReview(data) {
    this.setState({
      reviewVisible: true,
      currentDetail: data.flowDetail
    })
  }

  closeReview() {
    this.setState({
      reviewVisible: false,
      currentItem: {}
    })
  }

  componentWillMount() {
    this.props.getCheckList({
      currentPage: 1,
      turnPageShowNum: 10
    })
  }

  render() {
    const { form, userMenu, getCheckList, checkList, checkListSelectOpt, totalNum } = this.props
    const { getFieldDecorator } = form
    const { loading, currentItem, currentDetail, type, modalVisible, reviewVisible } = this.state

    const itemLayout = {
      labelCol: { 
        span: 6 
      },
      wrapperCol: {
        span:14 
      }
    }

    const columns = [{
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
        return <a onClick={e => {this.checkReview(record)}}>{text}</a>
      }
    }, {
      title: '申请人编号',
      dataIndex: 'applicantId',
      key: 'applicantId'
    }, {
      title: '申请人姓名',
      dataIndex: 'applicantName',
      key: 'applicantName'
    }, {
      title: '更新日期',
      dataIndex: 'updateDate',
      key: 'updateDate'
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        const buttonList = [{
          item: 'F006',
          button: <a onClick={e => {this.openAgreeModal(record)}}>同意</a>
        }, {
          item: 'F006', 
          button: <a onClick={e => {this.openRejectModal(record)}}>驳回</a>
        }]
        return checkBtnList(userMenu, buttonList)
      }
    }]

    const pagination = {
      total: Number(totalNum),
      current: Number(checkListSelectOpt.currentPage),
      showSizeChanger: true,
      pageSize: Number(checkListSelectOpt.turnPageShowNum),
      onShowSizeChange: (current, pageSize) => {
        getCheckList({
          currentPage: 1,
          turnPageShowNum: pageSize
        })
      },
      onChange: (current) => {
        getCheckList({
          currentPage: current,
          turnPageShowNum: checkListSelectOpt.turnPageShowNum
        })
      }
    }

    return (
      <div className="pageCheckList" style={{ padding: '20px 30px' }}>
        <Table
          rowKey='flowId'
          bordered
          columns={columns}
          dataSource={checkList}
          pagination={pagination}
        />
        <Modal
          title="同意审批"
          width={600}
          visible={modalVisible}
          onOk={this.checkSubmit}
          onCancel={e => this.closeModal()}
          footer={[
            <Button 
              key="back" 
              type="ghost" 
              size="large" 
              onClick={e => this.closeModal()}
            >
              返 回
            </Button>,

            <Button 
              key="submit" 
              type="primary" 
              size="large"  
              onClick={e => this.checkSubmit()} 
            >
              确定
            </Button>
          ]}
        >
          <Form layout="horizontal">
            <FormItem
              label="审批流水号"
              {...itemLayout}
            >
              <span>{currentItem.flowId}</span>
            </FormItem>
            <FormItem
              label="交易名称"
              {...itemLayout}
            >
              <span>{currentItem.bsnName}</span>
            </FormItem>
            { 
              type == 'agree' ? null : 
              <FormItem 
                label='驳回理由'
                {...itemLayout}
                required
              >
                {
                  getFieldDecorator('rejReason', {
                    initialValue: '',
                    rules: [{
                      required: true, 
                      message: '请填写驳回理由'
                    }]
                  })(
                    <Input  
                      placeholder='驳回理由' 
                      size='large' 
                     />
                  )
                }
              </FormItem>
            }
          </Form>  
          <Spin loading={loading}/>
        </Modal>
        <Modal
          title="交易详情"
          width={600}
          visible={reviewVisible}
          onCancel={e => this.closeReview()}
          footer={[
            <Button 
              key="back" 
              type="ghost" 
              size="large" 
              onClick={e => this.closeReview()}
            >
              返 回
            </Button>
          ]}
        >
          <div style={{ padding: '0 20px' }}>
            <InfoTable
              data={str2json(currentDetail)}
            /> 
          </div>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(CheckList)