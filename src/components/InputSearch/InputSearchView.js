import React, { Component } from 'react'
import { Form, Input, Icon, message } from 'antd'
const FormItem = Form.Item

const InputSearch = class InputSearchView extends Component {

  render() {
    const { form, placeholder, initialValue, onSearch } = this.props
    const { getFieldDecorator, getFieldsValue } = form
    return (
      <div className="app-input-search">
        <Form layout="inline">
          <FormItem>
            {getFieldDecorator('keyword', {
              initialValue: initialValue
            })(
              <Input 
                addonAfter={
                  <Icon type="search" onClick={e => {
                      let keyword = getFieldsValue().keyword
                      if (!keyword.trim()) {
                        message.warning('请输入搜索关键字！')
                      } else {
                        onSearch(keyword)
                      }
                    }
                  }/>
                } 
                placeholder={placeholder}
              />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(InputSearch)
