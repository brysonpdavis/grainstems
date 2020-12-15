import React, {useRef} from 'react'
import {Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    flexContainer: {
        display: 'flex', 
        justifyContent: 'center', 
        paddingTop: '50%',
        height: '400px'
    }
}))

const Visualizer = ({audioObject, frequencyBandArray}) => {

    const classes = useStyles()

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
            // let newArr = amplitudeValues.current.slice(2 ** (num) , 2 ** num + 1)
            // let newVal = newArr.reduce((x, y) => x + y) / newArr.length
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
        <div className={classes.flexContainer}>
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