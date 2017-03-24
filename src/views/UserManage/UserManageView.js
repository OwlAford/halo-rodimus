import React, { Component } from 'react'
import { Row, Col } from 'antd'
import BranchTree from 'COMPONENT/BranchTree'
import InputSearch from 'COMPONENT/InputSearch'
import UserQuery from './UserQuery'
import UserTable from './UserTable'

export default class UserManageView extends Component {

  constructor(props) {
    super(props)
    this.branchSelected = this.branchSelected.bind(this)
    this.onSearch = this.onSearch.bind(this)
  } 

  componentWillMount() {
    // 初始化银行机构列表
    this.props.initBranchList()
  }

  branchSelected(info) {
    const { userPageByBrh } = this.props
    userPageByBrh({
      currentPage: '1',
      brhId: info.brhId,
      brhName: info.title
    })
  }

  onSearch(brhName) {
    const { userPageByBrh, allBranchList } = this.props

    // 取到 brhId
    let id = ''
    allBranchList.map(item => {
      item.brhName == brhName ? id = item.brhId : null
    })

    userPageByBrh({
      currentPage: '1',
      brhId: id,
      brhName: brhName
    })
  }

  render() {
    const { treeBranchList, selectedKeys } = this.props
    return (
      <div className="pageUserManage">
        <Row>
          <Col span={5}>
            <div className="app-left-side">
              <InputSearch
                placeholder='请输入搜索机构名称'
                initialValue=''
                onSearch={this.onSearch}
              />
              <BranchTree
                selectedKeys={selectedKeys}
                selected={this.branchSelected}
                branchList={treeBranchList}
              />
            </div>
          </Col>
          <Col span={19}>
            <UserQuery/>
            <UserTable/>
          </Col>
        </Row>
      </div>
    )
  }

}