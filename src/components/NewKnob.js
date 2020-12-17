import React, {useState} from 'react'

const NewKnob = (props) => {
    let {text, startVal, show, units, min, max, rotRange, pixelRange, startRotation, diam, color, lineColor, onChange} = props

    // define defaults
    // if (value === undefined) value = 0
    // if (min === undefined) min = 0
    // if (max === undefined) max = 100
    // if (rotRange === undefined) rotRange = Math.PI * 2 * 0.9
    // if (pixelRange === undefined) pixelRange = 250
    // if (startRotation === undefined) startRotation = -Math.PI * 0.9
    // if (diam === undefined) diam = 250

    const [val, setVal] = useState(startVal)

    let valueRange = max - min
    let rotation = startRotation + (val - min) / valueRange * rotRange
    let startY, startValue;

    function clamp(num, min, max) {
        return Math.max(min, Math.min(num, max))
    }

    function pointerMove({clientY}) {
        const valueDiff = (max - min) * (clientY - startY) / pixelRange
        setVal(clamp(startValue - valueDiff, min, max))
        onChange(clamp(startValue - valueDiff, min, max))
    }

    function pointerDown({clientY}) {
        startY = clientY
        startValue = val
        window.addEventListener('pointermove', pointerMove)
        window.addEventListener('pointerup', pointerUp)
    }

    function pointerUp() {
        window.removeEventListener('pointermove', pointerMove)
        window.removeEventListener('pointerup', pointerUp)
    }

    let tdStyle = {
        padding: '16px 0 16px 0',
        width: '200px',
        position: 'relative'

    }

    let knobStyle = {
        touchAction: 'none',
        display: 'grid',
        position: 'relative',
        placeItems: 'center',
        padding: '0',
        transform: `rotate(calc(${rotation} * 1rad))`,
        transformOrigin: '50% 50%',
        overflow: 'visible',
    }

    let knobShadowStyle = {
        position: 'relative',
        display: 'block',
        width: `${diam.toString()}px`,
        height: `${diam.toString()}px`,
        borderRadius: '50%',
        content: '',
        boxShadow: `0 0 60px -20px ${lineColor}`,      
        padding: '0px',
        marginBottom: '-40%',
        zIndex: '-1'
    }

    return (
        <td style={tdStyle}>
            <h3>{text}</h3> 
            <h3> {show(val)} {units}</h3>
            <div style={knobStyle} onPointerDown={pointerDown}>
                <div style={knobShadowStyle}></div>
                <svg overflow='visible' width={diam} height={diam}>
                    <g>
                        <ellipse 
                            ry={diam/2} 
                            rx={diam/2} 
                            cy={diam/2} 
                            cx={diam/2} 
                            strokeOpacity="1" 
                            strokeWidth="0.5" 
                            stroke={lineColor} 
                            fill={color}
                        />
                        <line 
                            stroke={lineColor} 
                            strokeWidth="6" 
                            strokeLinecap="round" 
                            strokeLinejoin="null" 
                            y2={diam/2} 
                            x2={diam/2} 
                            y1="0" 
                            x1={diam/2} 
                        />
                    </g>
                </svg>	
            </div>
        </td>
    )
}


// define defaults

NewKnob.defaultProps = {
    text: '',
    startVal: 0,
    min: 0,
    max: 100,
    rotRange: Math.PI * 2 * 0.9, 
    pixelRange: 250,
    startRotation: -Math.PI * 0.9,
    diam: 250,
    color: '#555',
    lineColor: '#c0f3fc',
    show: (v) => v ,
    onChange: () => {}
}

export default NewKnob