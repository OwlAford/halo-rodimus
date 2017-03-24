import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, Select, TreeSelect, message, Modal, Radio } from 'antd'
import Spin from 'COMPONENT/Spin'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode
const RadioGroup = Radio.Group
const SHOW_PARENT = TreeSelect.SHOW_PARENT

const aCity = {11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'}

const BranchAdd = class BranchAddView extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      initVal: {
        userRight: '00000000',
        userLevel: '',
        brhId: '',
        postId: '',
        userMobile: '',
        userCertNo: '',
        userCertType: '',
        userAddress: '',
        userEmail: '',
        userDesc: '',
        userPwd: '',
        userLoginName: '',
        userName: ''
      },
      pswdChange: false,
      defaultPassword: '',
      boxTitle: '新增用户'
    }
    this.certCheck = this.certCheck.bind(this)
    this.onPwdChange = this.onPwdChange.bind(this)
  }

  onPwdChange() {
    this.setState({
      pswdChange: true
    })
  }

  componentWillMount() {
    const { form, userBox } = this.props
    form.resetFields()
    if (userBox.type == 'MODIFY') {
      this.setState({
        defaultPassword: '000000',
        boxTitle: '修改用户信息'
      })
      let newInitVal = Object.assign({}, 
        this.state.initVal, 
        userBox.initVal
      )
      this.setState({
        initVal: newInitVal
      })
    }
  }

  onClose() {
    const { userBox, setAddUserBoxVsisible, colseModifyUser } = this.props
    userBox.type == 'MODIFY' ? 
    colseModifyUser() : 
    setAddUserBoxVsisible(false)
    this.onClear()
  }

  onClear() {
    this.props.form.resetFields()
  }

  onSubmit() {
    const { form, userBox, postList, addUser, updateUser, allBranchList, branchAdd } = this.props
    const { getFieldsValue, validateFields, resetFields } = form

    validateFields((errors, values) => {
      if (!!errors) {
        message.error('填写内容有错误，请仔细填写！')
      } else {
        let params = getFieldsValue()

        // 取到岗位名
        let postId = params.postId
        let postName = ''
        postList.map(item => {
          if (postId && item.postId == postId) {
            postName = item.postName
          }
        })

        
        // 取到机构名
        let selectBranchId = params.brhId
        let brhName = ''
        allBranchList.map(item => {
          if (selectBranchId && item.brhId == selectBranchId) {
            brhName = item.brhName
          }
        })

        let data = Object.assign({
        }, getFieldsValue(), {
          brhName: brhName,
          postName: postName
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
        if (userBox.type == 'MODIFY') {
          Object.assign(data, {
            pswdChange: this.state.pswdChange,
            userNo: userBox.initVal.userNo
          })
          // 若密码未发生改变，将保存原密码
          this.state.pswdChange ? null : data.userPwd = userBox.initVal.userPwd
          updateUser(data, () => {
            hideSpin()
            this.onClear()
            this.onClose()
          }, hideSpin)
        } else {
          addUser(data, () => {
            hideSpin()
            this.onClear()
            this.onClose()
          }, hideSpin)
        }
      }  
    })
  }

  phoneNumberCheck(rule, value, callback) {
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/ 
    if (!reg.test(value)) { 
      callback('请输入有效的手机号码')
    } else {
      callback()
    }
  }

  pswdCheck(rule, value, callback) {
    const reg = /^\w{6,20}$/
    !reg.test(value) ? 
    callback([new Error('密码为6~20位字符')]) :
    callback()
  }

  certCheck(rule, value, callback) {
    const { getFieldValue } = this.props.form
    let key = getFieldValue('userCertType')
    if (key == '1') {
      var iSum = 0
      if (!/^\d{17}(\d|x)$/i.test(value)) {
        callback('身份证长度或格式错误')
        return
      }
      value = value.replace(/x$/i,'a')
      if (!aCity[parseInt(value.substring(0,2))]) {
        callback('身份证地区非法')
        return
      }
      let sBirthday = `${value.substr(6, 4)}/${Number(value.substr(10, 2))}/${Number(value.substr(12, 2))}`
      let birthDate = new Date(sBirthday)
      if (sBirthday != `${birthDate.getFullYear()}/${(birthDate.getMonth() + 1)}/${ birthDate.getDate()}`) {
        callback('身份证出生日期非法')
        return
      }
      for (var i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(value.charAt(17 - i), 11)
      }
      if (iSum % 11 != 1) {
        callback('身份证号非法')
        return
      }
      callback()
    } else if (key == '2') {
      const hureg = /^\w{7,}$/
      if (!hureg.test(value)){
        callback([new Error('请输入正确的护照')])
        return
      }
      callback()
    } else if (key == '3') {
      const greg = /^[G|T|S|L|Q|D|C|W]\w{9,11}\S+$/;
      if (!greg.test(value)) {
        callback([new Error('请输入正确的港澳通行证')])
        return
      }
      callback()
    } else if (value) {
      callback([new Error('请先选择证件类型')])
      return
    } else {
      callback()
      return
    }

  }

  render() {
    const { userBox, certType, postList, level, branchNodes } = this.props
    const { getFieldDecorator, resetFields } = this.props.form
    const { initVal, defaultPassword, boxTitle } = this.state

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    }

    const certTypeList = certType.map(item => <Option value={item.paramKey} key={item.paramKey} >{item.paramValue}</Option>)

    const postSelectList = postList.map(item => <Option key={item.postId} value={item.postId}>{item.postName}</Option>)

    // 用户等级
    const userLevelList = level.map(
      item => <Option value={item.paramKey} key={item.paramKey} >{item.paramValue}</Option>
    )

    // 清除按钮
    let clearBtn = ''
    userBox.type == 'ADD' 
    ? clearBtn = <Button key='clean' type='ghost' size='large' onClick={e => this.onClear()}>清除所有</Button> 
    : null

    const treeProps  = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: branchNodes, 
      placeholder: '请选择',
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT
    }

    return (
      <div className='BranchAdd'>
        <Modal
          title= {boxTitle}
          width={600}
          visible={true}
          onOk={this.onSubmit}
          onCancel={e => this.onClose()}
          footer={[
              <Button 
                key='back' 
                type='ghost' 
                size='large' 
                onClick={e => this.onClose()}
              >
                返 回
              </Button>,

              clearBtn,

              <Button 
                key='submit' 
                type='primary' 
                size='large'  
                onClick={e => this.onSubmit()} 
              >
                提 交
              </Button>
            ]}
          >
            <Form layout="horizontal">
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='用户姓名：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    {
                      getFieldDecorator('userName', {
                        initialValue: initVal.userName,
                        validate: [{
                          rules: [{ 
                            required: true,
                            message: '请输入用户名' 
                          }],
                          trigger: 'onBlur'
                        }]
                      })(
                        <Input  
                          placeholder='请输入用户名' 
                          size='large' 
                         />
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='登录用户：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    {
                      getFieldDecorator('userLoginName', {
                        initialValue: initVal.userLoginName,
                        validate: [{
                          rules: [{ 
                            required: true,
                            message: '请输入登录账号' 
                          }],
                          trigger: 'onBlur'
                        }]
                      })(
                        <Input  
                          placeholder='请输入登录账号' 
                          size='large' 
                        />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='登录密码：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    {
                      getFieldDecorator('userPwd', {
                        initialValue: defaultPassword,
                        onChange: this.onPwdChange,
                        rules: [{
                          required: true, 
                          message: ' '
                        }, {
                          validator: this.pswdCheck
                        }]
                      })(
                        <Input  
                          type='password'
                          placeholder='请输入密码' 
                          size='large' 
                        />
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='用户描述：'
                    {...formItemLayout}
                  >
                    {
                      getFieldDecorator('userDesc', {
                        initialValue: initVal.userDesc,
                      })(
                        <Input  
                          placeholder='请填写用户描述' 
                          size='large' 
                        />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>  
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='用户邮箱：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    {
                      getFieldDecorator('userEmail', {
                        initialValue: initVal.userEmail,
                        validate: [{
                          rules: [{ 
                            required: true,
                            message:'请输入邮箱地址' 
                          }],
                          trigger: 'onBlur',
                        }, {
                          rules: [{ 
                            type: 'email', 
                            message: '请输入正确邮箱地址' 
                          }],
                          trigger: ['onBlur', 'onChange']
                        }]
                      })(
                        <Input  
                          placeholder='请输入邮箱地址' 
                          size='large' 
                        />
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='用户住址：'
                    {...formItemLayout}
                  >
                    {
                      getFieldDecorator('userAddress', {
                        initialValue: initVal.userAddress,
                      })(
                        <Input  
                          placeholder='请填写用户住址' 
                          size='large' 
                        />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='证件类型：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    {
                      getFieldDecorator('userCertType', {
                        initialValue: initVal.userCertType,
                        rules: [{
                          required: true, 
                          message: '请选择证件类型'
                        }]
                      })(
                        <Select placeholder='请选择证件类型'>
                          {certTypeList}
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='证件号码：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    {
                      getFieldDecorator('userCertNo', {
                        initialValue: initVal.userCertNo,
                        rules: [{
                          required: true, 
                          message: '请输入证件号码'
                        }, {
                          validator: this.certCheck
                        }]
                      })(
                        <Input  
                          placeholder='请输入证件号码' 
                          size='large' 
                         />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>  
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='手机号码：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    {
                      getFieldDecorator('userMobile', {
                        initialValue: initVal.userMobile,
                        rules: [
                          {
                            required: true, 
                            message: ' '
                          }, {
                            validator: this.phoneNumberCheck
                          }
                        ]
                      })(
                        <Input  
                          placeholder='请输入手机号码' 
                          size='large' 
                        />
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='所属机构：'
                    required
                    hasFeedback
                    {...formItemLayout}
                  >
                    {
                      getFieldDecorator('brhId', {
                        initialValue: initVal.brhId,
                        rules: [
                          {
                            required: true, 
                            message: '请选择所属机构'
                          }
                        ]
                      })(
                        <TreeSelect 
                          placeholder='请选择所属机构' 
                          {...treeProps}
                          allowClear={true}
                        >
                        </TreeSelect>
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='岗位选择：'
                    {...formItemLayout}
                  >
                    {
                      getFieldDecorator('postId', {
                        initialValue: initVal.postId,
                        rules: [{
                          message: '请选择岗位'
                        }]
                      })(
                        <Select placeholder='请选择岗位'>
                          {postSelectList}
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='用户等级：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    {
                      getFieldDecorator('userLevel', {
                        initialValue: initVal.userLevel,
                        rules: [{
                          required: true, 
                          message: '请选择用户等级'
                        }]
                      })(
                        <Select placeholder='请选择用户等级'>
                          {userLevelList}
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
              </Row>    
                <Col span={12}>
                  <FormItem 
                    label='审批权限：'
                    {...formItemLayout}
                    required
                  >
                    {
                      getFieldDecorator('userRight', {
                        initialValue: initVal.userRight,
                        rules: [{
                          message: ' '
                        }]
                      })(
                        <RadioGroup>
                          <Radio key='a' value='00000100'>有</Radio>
                          <Radio key='b' value='00000000'>无</Radio>
                        </RadioGroup>
                      )
                    }
                  </FormItem>
                </Col>
              <Row>    
              </Row>    
            </Form>
            <Spin loading={this.state.loading}/>
          </Modal>
      </div>
    )
  }
}

export default Form.create()(BranchAdd)