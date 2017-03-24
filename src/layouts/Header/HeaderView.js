import React, { Component } from 'react'
import { Link } from 'react-router'
import Account from '../Account'
import Sidebar from '../Sidebar'
import ChangePswd from '../ChangePswd'

export default class HeaderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMenus: {},
      currentUrl: ''
    }
  } 

  handleMenu(index) {
    let items = this.props.items[index]
    this.setState({
      currentMenus: items.menus[0],
      currentUrl: items.url
    })
  }

  componentWillMount() {
    let items = this.props.items[0]
    this.setState({
      currentMenus: items.menus[0],
      currentUrl: items.url
    })
  }

  render() {

    const LnkList = params => {
      return (
        <div className="guide">
        {params.map(
          (item, i) => {
            return (
              <Link 
                key={i}
                to={item.url} 
                activeClassName='active' 
                onClick={e => this.handleMenu(i)}
              >
                {item.title}
              </Link>
            ) 
          }
        )}
        </div>
      )
    }
    const { items, router, passwordVisible } = this.props
    const { currentMenus, currentUrl } = this.state
    return (
      <div className="app-header">
        <div className="logo"></div>
        {LnkList(items)}
        <Sidebar 
          menus={currentMenus} 
          parentUrl={currentUrl}
        />
        <Account router={router}/>
        {passwordVisible ? <ChangePswd router={router}/> : null}
      </div>     
    )
  }
}