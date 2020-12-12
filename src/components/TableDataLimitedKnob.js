import LimitedKnob from './LimitedKnob'
import React from 'react'

const TableDataLimitedKnob = (props) => {
    return (
      <td>
        <h3>{props.text}</h3>
        <LimitedKnob {...props}/>
      </td>
    )
}
  

export default TableDataLimitedKnob