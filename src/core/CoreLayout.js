import React from 'react'
import 'STYLE'

const CoreLayout = ({ children }) => (
  <div className='app-container'>
    { children }
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
