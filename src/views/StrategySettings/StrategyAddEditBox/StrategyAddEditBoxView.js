import React, { Component } from 'react'
import { Form, Button, Input, message, Slider, Modal, Radio } from 'antd'
import Spin from 'COMPONENT/Spin'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const StrategyAddEditBox = class StrategyAddEditBoxView extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    const { form } = this.props
    form.resetFields()

  }

  onClose() {
    const { setAddEditModalVisible } = this.props
    setAddEditModalVisible(false)
  }

  onClear() {
    this.props.form.resetFields()
  }

  onSubmit() {
    const { form, modalType, initVal, addStrategy, editStrategy } = this.props
    const { getFieldsValue, validateFields, resetFields } = form
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

    validateFields((errors, values) => {
      if (!!errors) {
        message.error('填写内容有错误，请仔细填写！')
      } else {
        let params = getFieldsValue()
        let isAdd = modalType == 'add'
        let handleFn = editStrategy
        params.authDefine = '' + params.ad1 + params.ad2 + params.ad3 + params.ad4 + params.ad5
        isAdd 
        ? handleFn = addStrategy
        : Object.assign(params, {
          authId: initVal.authId,
          areaNo: initVal.areaNo
        })
        
        showSpin()
        handleFn(params, () => {
          hideSpin()
          this.onClose()
        }, hideSpin)
      }  
    })
  }
 
  render() {
    const { form, modalType, initVal } = this.props
    const { getFieldDecorator, resetFields } = form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    }

    const sliderSetup = {
      min: 0,
      max: 9, 
      marks: {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9'
      }
    }

    const isAdd = modalType == 'add'

    return (
      <div className='strategyAddEdit'>
        <Modal
          title= {isAdd ? '新增策略' : '修改策略'}
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
              {
                isAdd ? 
                null : 
                <FormItem
                  label='策略编号'
                  {...formItemLayout}
                >
                  <span>{initVal.authId}</span>
                </FormItem>
              }
              <FormItem 
                label='策略名称：'
                {...formItemLayout}
                required
                hasFeedback
              >
                {
                  getFieldDecorator('alias', {
                    initialValue: isAdd ? '' : initVal.alias,
                    validate: [{
                      rules: [{ 
                        required: true,
                        message: '请填写策略名称' 
                      }],
                      trigger: 'onBlur'
                    }]
                  })(
                    <Input  
                      placeholder='请填写策略名称' 
                      size='large' 
                     />
                  )
                }
              </FormItem>
              <FormItem 
                label='授权方式：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('authType', {
                    initialValue: isAdd ? '0' : initVal.authType,
                  })(
                    <RadioGroup>
                      <Radio value='0'>无序</Radio>
                      <Radio value='1'>有序</Radio>
                    </RadioGroup>
                  )
                }
              </FormItem>
              <FormItem 
                label='一级授权人数：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('ad1', {
                    initialValue: isAdd ? 0 : Number(initVal.add1),
                  })(
                    <Slider
                      {...sliderSetup}
                    />
                  )
                }
              </FormItem>
              <FormItem 
                label='二级授权人数：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('ad2', {
                    initialValue: isAdd ? 0 : Number(initVal.add2),
                  })(
                    <Slider
                      {...sliderSetup}
                    />
                  )
                }
              </FormItem>
              <FormItem 
                label='三级授权人数：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('ad3', {
                    initialValue: isAdd ? 0 : Number(initVal.add3),
                  })(
                    <Slider
                      {...sliderSetup}
                    />
                  )
                }
              </FormItem>
              <FormItem 
                label='四级授权人数：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('ad4', {
                    initialValue: isAdd ? 0 : Number(initVal.add4),
                  })(
                    <Slider
                      {...sliderSetup}
                    />
                  )
                }
              </FormItem>
              <FormItem 
                label='五级授权人数：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('ad5', {
                    initialValue: isAdd ? 0 : Number(initVal.add5),
                  })(
                    <Slider
                      {...sliderSetup}
                    />
                  )
                }
              </FormItem>                     
            </Form>
            <Spin loading={this.state.loading}/>
          </Modal>
      </div>
    )
  }
}

export default Form.create()(StrategyAddEditBox)