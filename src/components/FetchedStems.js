import React, {useState, useEffect} from 'react'
import getAllStems from '../api/queries'

const FetchedStems = ({audioObject}) => {
    const[stemsList, setStemsList] = useState([])

    useEffect(() => {
        getAllStems.then(res => setStemsList(res))
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
                    onClick={() => audioObject.resetGrainPlayer(data.url)}
                >
                    {i + 1} : {data.name}
                </button>)
        )
    }
}

export default FetchedStems