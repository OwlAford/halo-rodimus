import React, { Component } from 'react'
import { Link } from 'react-router'
import Scroll from 'COMPONENT/Scroll'

export default class SidebarView extends Component {

  handleActive(e) {
    const target = e.target
    const parent = target.parentNode

    if (target.getAttribute('data-state') == '0') {
      parent.classList.add('active')
      target.setAttribute('data-state', '1')
    } else {
      parent.classList.remove('active')
      target.setAttribute('data-state', '0')
    }
  
  }

  render() {
    // 定义一个样式映射表
    const CSS = {
      A001B001: 'organization',
      A001B002: 'userManage',
      A001B003: 'roleManage',
      A001B004: 'postManage',
      A001B005: 'strategyManage',
      A001B006: 'reviewManage'
    }

    const { selectMenu, parentUrl, menus } = this.props

    const Menu = (menus, preUrl) => (
      <div className="menu">
        <div className="menu-title"><span>{menus.title}</span></div>
        {menus.menus.map(
          (item, i) => {
            // 若只有单项
            if (item.menus.length == 0) {
              return (
                <div className="subMenu" key={i}>
                  <div className="title single">
                    <Link 
                      to={preUrl + item.url} 
                      activeClassName='active' 
                      onClick={e => selectMenu(item.id)}
                    >
                      <i className={`iconfont ${CSS[item.id]}`}></i>
                      {item.title}
                    </Link>
                  </div>
                </div>
              )
            } else {
              // 若有多项
              return (
                <div className="subMenu" key={i}>
                  <div className="title arr" data-state="0" onClick={e => this.handleActive(e)}>
                    <i className={`iconfont ${CSS[item.id]}`}></i>
                    {item.title}
                  </div>
                  <div className="menuList">
                    {
                      item.menus.map(
                        (item, i) => {
                          return (
                            <div className="item" key={i}>
                              <Link 
                                to={preUrl + item.url} 
                                activeClassName='active'
                                onClick={e => selectMenu(item.id)}
                              >
                                {item.title}
                              </Link>
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                </div>
              )
            }
          }
        )}
      </div>
    )

    return (
      <div className="app-sidebar">
        <Scroll>
          {Menu(menus, parentUrl)}
        </Scroll>
      </div>
    )
  }  
}
  