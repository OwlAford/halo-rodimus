import React from 'react'

const InfoTableTr = data => data.map((item, i) => {
  return (
    <tr key={i}>
      <td style={{ padding: '5px 0', textAlign: 'right', fontWeight: 'bold' }}>{item.key}：</td>
      <td style={{ padding: '5px 0' }}>{item.value}</td>
    </tr>
  )
})

const InfoTableView = ({ data }) => {
  return (
    <table>
      <tbody>
        {InfoTableTr(data)}
      </tbody>
    </table>
  )
}

export default InfoTableView