import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, Select, TreeSelect, message, Modal } from 'antd'
import Spin from 'COMPONENT/Spin'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode
const SHOW_PARENT = TreeSelect.SHOW_PARENT

const AddRoleBox = class AddRoleBoxView extends Component {
  
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
    this.props.setAddRoleBoxVisible(false)
    this.onClear()
  }

  onClear() {
    this.props.form.resetFields()
  }

  onSubmit() {
    const { form, addRole } = this.props
    const { getFieldsValue, validateFields, resetFields } = form
    validateFields((errors, values) => {
      if (!!errors) {
        message.error('请正确填写内容！')
      } else {
        let formData = getFieldsValue()
        for (let key in formData) {
          let val = formData[key]
          val ? formData[key] = val : formData[key] = ''
        }
        Object.assign(formData, {
          rolePName: ''
        })

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
        addRole(formData, () => {
          this.onClear()
          this.onClose()
          hideSpin()
        }, hideSpin)
      }
    })
  }

  render() {
    const { form, treeNodes, visible } = this.props
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    }

    const treeProps  = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: treeNodes,        
      placeholder: '请选择所属角色',
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT
    }

    return (
      <div className="AddRoleBox">
        <Modal
          title="添加角色"
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

              <Button 
                key="clean" 
                type="ghost" 
                size="large" 
                onClick={e => this.onClear()}
              >
                清除所有
              </Button>,

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
                    label='角色名：'
                    {...formItemLayout}
                    required
                  >
                    {
                      getFieldDecorator('roleName', {
                        rules: [
                          {
                            required: true, 
                            message: '请输入角色名'
                          }
                        ]
                      })(
                        <Input 
                          placeholder='请输入角色名' 
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
                      getFieldDecorator('roleStatus', {
                        rules: [
                          {
                            required: true, 
                            message: '请选择状态'
                          }
                        ]
                      })(
                        <Select 
                          placeholder='请选择状态' 
                        >
                          <Option value='1'>可用</Option>
                          <Option value='0'>禁用</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>

                <Col span={13}>
                  <FormItem 
                    label='角色描述：'
                    {...formItemLayout}
                  >
                    {
                      getFieldDecorator('roleDesc')(
                        <Input 
                          placeholder='请输入角色描述' 
                          size='large' 
                        />
                      )
                    }
                  </FormItem>
                  <FormItem 
                    label='所属角色：'
                    {...formItemLayout}
                  >
                    {
                      getFieldDecorator('rolePId')(
                        <TreeSelect 
                          {...treeProps} 
                          allowClear
                        >
                        </TreeSelect>
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

export default Form.create()(AddRoleBox)