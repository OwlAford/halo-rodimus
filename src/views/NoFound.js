import React, { Component, PropTypes } from 'react'
import { HOME_PATH } from 'GLOBAL'
import { message } from 'antd'

export default class NotFound extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    message.error('找不到该页面！')
    let timer = setTimeout(() => {
      this.context.router.replace(HOME_PATH)
      clearTimeout(timer)
    }, 2000)
  }

  render () {
    return null
  }
}
