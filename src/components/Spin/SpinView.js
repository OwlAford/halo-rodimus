import React from 'react'
import { Spin } from 'antd'

const SpinView = ({ loading }) => {
  return (
    <div className="app-spin">
      <Spin size="large" spinning={loading}/>
    </div>
  )
}

export default SpinView