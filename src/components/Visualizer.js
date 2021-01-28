import React, {useRef} from 'react'
import {Paper} from '@material-ui/core'

const Visualizer = ({audioObject, frequencyBandArray, visible}) => {

    for(let key in audioObject) {
        if (typeof(audioObject[key]) == 'function') {
            audioObject[key] = audioObject[key].bind(audioObject)
        }
    }    

    const amplitudeValues = useRef(null)

    
    const adjustFreqBandStyle = (newAmplitudeData) => {
        amplitudeValues.current = newAmplitudeData
        let domElements = frequencyBandArray.map((num) => 
            document.getElementById(num)
        )
        for (let i=0; i< frequencyBandArray.length; i++) {
            let num = frequencyBandArray[i]
            domElements[num].style.backgroundColor = `rgba(192, 243, 252, ${(amplitudeValues.current[num] + 180 ) / 180})`
            domElements[num].style.height = `${amplitudeValues.current[num] + 200}px`
        }
    } 

    const getFrequencyData = (styleAdjuster) => {
        const amplitudeArray = audioObject.fft.getValue()
        styleAdjuster(amplitudeArray)
    }

    const runSpectrum = () => {
        getFrequencyData(adjustFreqBandStyle)
        requestAnimationFrame(runSpectrum)
    }

    const handleStartButtonClick = () => {
        requestAnimationFrame(runSpectrum)
    }

    handleStartButtonClick()

    return (
        <div className={'vis-container'} style={{height: (visible ? 'calc(100% - 6em)': '0')}}>
            {frequencyBandArray.map((num) => 
                <Paper
                    className={'frequencyBands'}
                    elevation={0}
                    id={num}
                    key={num}
                />
            )}
        </div>
    )
}

export default Visualizer