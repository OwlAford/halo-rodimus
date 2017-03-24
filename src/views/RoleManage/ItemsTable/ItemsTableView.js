import React, { Component } from 'react'
import { Table } from 'antd'



export default class ItemsTableView extends Component {

  componentWillUnmount() {
    this.props.clearTableItems()
  }

  render() {

    const { getAllRoleFnItems, totalSize, pageSize, curPage, curRoleId, dataSource } = this.props
    const columns = [{
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    }, {
      title: '功能名称',
      dataIndex: 'menuItemName',
      key: 'menuItemName'
    }]

    let pagination = {
      total: Number(totalSize),
      showQuickJumper: true,
      pageSize: pageSize,
      current: curPage,
      onChange(current) {
        getAllRoleFnItems(current, curRoleId, '', 1)
      }
    }

    return (
      <Table 
        columns={columns} 
        bordered 
        dataSource={dataSource} 
        pagination={pagination}
      />
    )
  }

}
