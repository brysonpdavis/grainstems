import React, {useState} from 'react'
import {Knob} from 'react-rotary-knob'


const LimitedKnob = (props) => {
    const [value, setValue] = useState(props.startval)
    
    const handleOnChange = (val) => {   
        let distance = Math.abs(val - value)
        if (distance > props.maxDistance) {
            setValue(value < val ? props.min : props.max)
        } else {
            setValue(val)
        }
        props.change.change(value)
    }

    let {maxDistance, ...rest} = props

    return (
        <div><Knob value = {value} onChange={handleOnChange} {...rest} /></div>
    )
}

export default LimitedKnob