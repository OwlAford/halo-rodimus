import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal, Radio } from 'antd'
import Spin from 'COMPONENT/Spin'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const AddEditPostBox = class AddEditPostBoxView extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    this.props.form.resetFields()
  }

  onClose() {
    this.props.closeAddEditBox()
    this.onClear()
  }

  onClear() {
    this.props.form.resetFields()
  }

  onSubmit() {
    const { form, formType, addPostList, modifyPost, initVals } = this.props
    const { getFieldsValue, validateFields, resetFields } = form
    validateFields((errors, values) => {
      if (!!errors) {
        message.error('请正确填写内容！')
      } else {
        let formData = getFieldsValue()
        let handle = addPostList

        if (formType == 'edit') {
          formData.postId = initVals.postId
          handle = modifyPost
        }
        
        const showSpin = () => {
          this.setState({
            loading: true
          })
        }
        
        const hideSpin = () => {
          this.setState({
            loading: false
          })
        }

        showSpin()
        handle(formData, () => {
          this.onClear()
          this.onClose()
          hideSpin()
        }, hideSpin)
      }
    })
  }

  render() {
    const { visible, formType, initVals, form } = this.props
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }

    let addType = formType == 'add' ? true : false

    return (
      <div className="AddRoleBox">
        <Modal
          title={addType ? '新增岗位' : '修改岗位'}
          width={600}
          visible={visible}
          onOk={this.onSubmit}
          onCancel={e => this.onClose()}
          footer={[
            <Button 
              key="back" 
              type="ghost" 
              size="large" 
              onClick={e => this.onClose()}
            >
              返 回
            </Button>,

            addType ? 
            <Button 
              key="clean" 
              type="ghost" 
              size="large" 
              onClick={e => this.onClear()}
            >
              清除
            </Button> : '',

            <Button 
              key="submit" 
              type="primary" 
              size="large"  
              onClick={e => this.onSubmit()} 
            >
              提 交
            </Button>
          ]}
        >
          <Form layout="horizontal">
            <Row>
              <Col span={11}>
                <FormItem 
                  label='岗位名称：'
                  {...formItemLayout}
                  required
                >
                  {
                    getFieldDecorator('postName', {
                      initialValue: addType ? '' : initVals.postName,
                      rules: [
                        {
                          required: true, 
                          message: '请输入岗位名称'
                        }
                      ]
                    })(
                      <Input 
                        placeholder='请输入岗位名称' 
                        size='large' 
                      />
                    )
                  }
                </FormItem>
                <FormItem 
                  label='状态：'
                  {...formItemLayout}
                  required
                >
                  {
                    getFieldDecorator('state', {
                      initialValue: addType ? '0' : initVals.state,
                      rules: [{
                        message: ' '
                      }]
                    })(
                      <RadioGroup>
                        <Radio key='a' value='1'>可用</Radio>
                        <Radio key='b' value='0'>禁用</Radio>
                      </RadioGroup>
                    )
                  }
                </FormItem>
              </Col>

              <Col span={13}>
                <FormItem 
                  label='备注：'
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('remark', {
                      initialValue: addType ? '' : initVals.remark
                    })(
                      <Input 
                        placeholder='请输入备注' 
                        size='large' 
                      />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </Form>
          <Spin loading={this.state.loading}/>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(AddEditPostBox)