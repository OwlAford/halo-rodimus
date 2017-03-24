import React, { Component } from 'react'
import { Table, Modal } from 'antd'
import Spin from 'COMPONENT/Spin'
import { formatDateTime } from 'UTIL/filters'
import { checkBtnList } from 'UTIL/authButton'
import PreviewBox from '../PreviewBox'
import BindRoleBox from '../BindRoleBox'

export default class UserTableView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  setSpin(state) {
    this.setState({
      loading: state
    })
  }

  modify(data) {
    this.setSpin(true)
    this.props.modifyUser(data.userNo, () => {
      this.setSpin(false)
    }, () => {
      this.setSpin(false)
    })
  }

  preview(data) {
    let Props = this.props
    this.setSpin(true)
    Props.previewUser(data.userNo, () => {
      this.setSpin(false)
    }, () => {
      this.setSpin(false)
    })
  }

  bindRole(data) {
    this.props.getUserRoleTree(data.userNo)
    this.props.userBindRole(data)
  }

  delUser(data) {
    const { pageData, delUserUpdate } = this.props
    const curPage = pageData.currentPage
    Modal.confirm({
      title: '删除用户',
      content: '是否确认删除用户？',
      onOk() {
        delUserUpdate(data.userNo, data.brhId, curPage)
      }
    })
  }

  render() {
    const { userMenu, dataSource, totalSize, pageData, userPageByBrh } = this.props

    const columns = [{
        title: '登录用户',
        dataIndex: 'userLoginName',
        key: 'userLoginName'
      }, {
        title: '用户编号',
        dataIndex: 'userNo',
        key: 'userNo'
      }, {
        title: '用户姓名',
        dataIndex: 'userName',
        key: 'userName'
      }, {
        title: '所属机构',
        dataIndex: 'brhName',
        key: 'brhName'
      }, {
        title: '用户级别',
        dataIndex: 'userLevel',
        key: 'userLevel'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render(text, record) {
          return(<span>{formatDateTime(text)}</span>)
        }
      }, {
        title:'操作',
        key:'operation',
        render: (text, record) => {
          return checkBtnList(userMenu, [{
            item: 'F002', 
            button: <a onClick={e => this.modify(record)}>修改</a>
          }, {
            item: 'F004', 
            button: <a onClick={e => this.delUser(record)}>删除</a>
          }, {
            item: 'F003', 
            button: <a onClick={e => this.preview(record)}>查看</a>
          }, {
            item: 'F009', 
            button: <a onClick={e => this.bindRole(record)}>绑定角色</a>
          }])
        }
      }
    ]

    let { currentPage, turnPageShowNum } = pageData
    let pagination = {
      total: Number(totalSize),
      defaultCurrent: 1,
      current: Number(currentPage),
      showSizeChanger: true,
      pageSize: Number(turnPageShowNum),

      onShowSizeChange(current, pageSize) {
        pageData.turnPageShowNum = pageSize
        pageData.currentPage = current
        userPageByBrh(pageData)
      },

      onChange(current) {
        pageData.currentPage = current
        userPageByBrh(pageData)
      }
    }

    return (
      <div className="userQuery app-narrow-table" style={{padding: '0 20px'}}>
        <Table columns={columns} dataSource={dataSource} bordered pagination={pagination}/>
        <PreviewBox/>
        <BindRoleBox/>
        <Spin loading={this.state.loading}/>
      </div>
    )
  }

}