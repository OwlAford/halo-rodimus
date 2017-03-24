import React, { Component } from 'react'
import { withRouter } from 'react-router'

/*
 * 使用方法：（当前路径为 /foo）
 * 在 JSX 中：<Link to="/redirect?dest=/foo">重载本页</Link>
 * 在 JS 中：this.context.router.replace('/redirect?dest=/foo')
 */

class Redirect extends Component {

  componentWillMount() {
    const { router, location } = this.props
    router.replace(location.query.dest)
  }

  render () {
    return null
  }
}

export default withRouter(Redirect)
