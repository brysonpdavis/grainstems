import React, {useState, useEffect} from 'react'
import getAllStems from '../services/queries'

const FetchedStems = ({audioObject, setCurrentlyPlaying, setSampleDuration}) => {
    const[stemsList, setStemsList] = useState([])

    const setNewSample = (url, sampleName) => {
        audioObject.resetGrainPlayerAndSampleDuration(url, setSampleDuration)
        setCurrentlyPlaying(sampleName)
    }

    useEffect(() => {
        const setNewSample = (url, sampleName) => {
            audioObject.resetGrainPlayerAndSampleDuration(url, setSampleDuration)
            setCurrentlyPlaying(sampleName)
        }
    
        getAllStems.then(res =>{ 
            setStemsList(res) 
            setNewSample(res[0].data.url, res[0].data.name)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (stemsList === []) {
        return (
            <h3>loading stems</h3>
        )
    }
    else {
        return (
            stemsList.map(({data}, i) => 
                <button 
                    key={data.id}
                    onClick={() => setNewSample(data.url, data.name)}
                >
                    {i + 1} : {data.name}
                </button>)
        )
    }
}

export default FetchedStems