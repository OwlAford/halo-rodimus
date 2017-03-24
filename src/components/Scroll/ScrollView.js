import React, { Component } from 'react'

export default class ScrollView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      couldScroll: false,
      maxBarScroll: 0,
      maxPageScroll: 0,
      barOpacity: 0
    }
    this.initScrollerBar = this.initScrollerBar.bind(this)
  } 

  componentDidMount() {
    this.initScrollerWidth()
    this.initScrollerBar()
    if (window.addEventListener) { 
      window.addEventListener('resize', this.initScrollerBar, false)
    }
  }

  initScrollerWidth() {
    const { container, scroller } = this.refs
    scroller.style.width = container.offsetWidth + 'px'
  }

  initScrollerBar() {
    const { container, scroller, scrollbar } = this.refs
    if (!container || !scroller)
      return
    const conHeight = container.offsetHeight
    const scrHeight = scroller.offsetHeight
    const ratio = conHeight / scrHeight
    let barHeight = conHeight * ratio
    barHeight < 50 ? barHeight = 50 : null

    if (ratio >= 1) {
      this.setState({
        couldScroll: false
      })
      scrollbar.style.display = 'none'
    } else {
      this.setState({
        couldScroll: true,
        maxBarScroll: conHeight - barHeight,
        maxPageScroll: scrHeight - conHeight
      })
      scrollbar.style.display = 'block'
      scrollbar.style.height = barHeight + 'px'
    }
  }

  onScrollHandle() {
    if (!this.state.couldScroll)
      return
    const { wrapper, scrollbar } = this.refs
    const { maxBarScroll, maxPageScroll } = this.state
    scrollbar.style.top = ~~(wrapper.scrollTop * maxBarScroll / maxPageScroll) + 'px'
  }

  render () {
    const { children, bgColor, barStyles } = this.props

    let barWrapStyles = {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '11px',
      padding: '2px',
      opacity: this.state.barOpacity,
      transition: 'opacity .3s'
    }

    const wrapStyles = {
      height: '100%', 
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }
    
    const defaultBarStyles = {
      width: '100%', 
      height: '100%',
      background: '#000',
      opacity: '.2',
      borderRadius: '4px',
      display: 'block'
    }

    const finalBarStyles = Object.assign({}, defaultBarStyles, barStyles)

    const eventHandle = {
      onScroll: e => this.onScrollHandle(e),
      onWheel: e => this.initScrollerBar(e)
    }

  	return (
      <div 
        ref='container' 
        style={wrapStyles}
        onMouseEnter={e => {this.setState({barOpacity: 1})}}
        onMouseLeave={e => {this.setState({barOpacity: 0})}}
      > 
        <div
          ref='wrapper' 
          style={{
            ...wrapStyles, 
            paddingRight: '20px', 
            overflow: 'auto', 
            boxSizing: 'content-box'
          }}
          {...eventHandle}
        >
          <div 
            ref='scroller' 
            style={{
              width: '100%', 
              background: bgColor ? bgColor : 'none'
            }}
          >
            { children }
          </div>
        </div>
        <div ref='scrollbar' style={barWrapStyles}>
          <i style={finalBarStyles}></i>
        </div>
      </div>
    )
  }

}
