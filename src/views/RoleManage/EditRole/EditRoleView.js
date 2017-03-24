import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal, TreeSelect, Select } from 'antd'
import { checkBtnList } from 'UTIL/authButton'
import AddRoleBox from '../AddRoleBox'
import BindRoleBox from '../BindRoleBox'

const confirm = Modal.confirm
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode
const SHOW_PARENT = TreeSelect.SHOW_PARENT

const EditRole = class EditRoleView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentId: ''
    }
  }

  setChangeState(id) {
    // id发生变化，则刷新表单
    if (id != this.state.currentId) {
      this.props.form.resetFields()
      this.setState({
        currentId: id
      })
    }
  }

  addNewRole() {
    this.props.setAddRoleBoxVisible(true)
  }

  bindRole() {
    const { info, setBindRoleBoxVisible } = this.props
    if (!info.roleId) {
      message.error('请先选择一个角色！')
      return
    } 
    setBindRoleBoxVisible(true)
  }

  deleteRole() {
    const { info, delRole } = this.props
    if (!info.roleId) {
      message.error('请先选择一个角色！')
      return
    } 
    confirm({
      title: '删除角色',
      content: '是否确认删除角色？',
      onOk() {
        delRole(info.roleId)
      }
    })
  }

  saveModify() {
    const { form, info, selectModifyRole, updateRole } = this.props
    const { getFieldsValue, validateFields, resetFields } = form
    if (!info.roleId) {
      message.error('请先选择一个角色！')
      return
    } 
    validateFields((errors, values) => {
      if (!!errors) {
        message.error('请正确填写内容！')
        resetFields()
      } else {
        if (selectModifyRole == info.roleId) {
          message.error('不可选择该角色为所属角色！')
        } else {
          updateRole({
            ...getFieldsValue(),
            roleId: info.roleId ? info.roleId : '',
            rolePId: selectModifyRole ? selectModifyRole : ''
          })
        }
      }
    })
  }

  componentWillReceiveProps(newProps) {
    // 通过监听属性的变化判断是否需要重置表单
    this.setChangeState(newProps.info.roleId)
  }


  render() {

    const { form, treeNodes, info, selectModifyRole, setSelectTreeVal, userMenu } = this.props
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    }

    const modBtn = (
      <Button 
        size="large" 
        onClick={e => this.saveModify()}
      >
        保存修改
      </Button>
    )

    const bindBtn = (
      <Button 
        size="large" 
        type="ghost"
        onClick={e => this.bindRole()}
      >
        关联功能
      </Button>
    )

    const addBtn = (
      <Button 
        size="large" 
        type="primary" 
        onClick={e => this.addNewRole()}
      >
        添加角色
      </Button>
    )

    const delBtn = (
      <Button 
        size="large" 
        type="danger" 
        onClick={e => this.deleteRole()}
      >
        删除角色
      </Button>
    )

    const onChange = (val) => {
      setSelectTreeVal(val)
    }

    const treeProps  = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: treeNodes,      
      onChange: onChange,      
      value: selectModifyRole,     
      placeholder: '请选择所属角色',
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT
    }

    return (
      <div className="app-search-panel">
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
                    initialValue: info.roleName,
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
                    initialValue: info.roleStatus,
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
                  getFieldDecorator('roleDesc', {
                    initialValue: info.roleDesc
                  })(
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
                <TreeSelect 
                  {...treeProps} 
                  allowClear
                >
                </TreeSelect>
              </FormItem>
            </Col>
          </Row>
          <div className="button-group">
            {checkBtnList(userMenu, [{
              item: 'F002',
              button: modBtn
            }, {
              item: 'F009',
              button: bindBtn
            }, {
              item: 'F001',
              button: addBtn
            }, {
              item: 'F004',
              button: delBtn
            }], true)}
          </div>  
        </Form>
        <AddRoleBox/>
        <BindRoleBox/>
      </div>  
    )
  }

}

export default Form.create()(EditRole)