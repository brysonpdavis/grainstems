import LimitedKnob from './LimitedKnob'
import React from 'react'

const TableDataLimitedKnob = (props) => {
  let tdStyle = {
    position: 'relative',
    padding: '16px',
  }
    return (
      <td style = {tdStyle}>
        <h3>{props.text}</h3>
        <LimitedKnob {...props}/>
      </td>
    )
}
  

export default TableDataLimitedKnob