import React, {useState} from 'react'

const UploadForm = () => {
    const [_name, setName] = useState('')
    // const [audioFile, setAudioFile] = useState({})
    const [description, setDescription] = useState('')
    const [contributor, setContributor] = useState('')

    // const encode = (data) => {
    //     return Object.keys(data)
    //         .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    //         .join("&")
    // }
    
    // {
    //     const formData = new FormData()
    //     Object.keys(data).forEach(k=>{
    //         formData.append(k, data[k])
    //     })
    //     return formData
    // }

    // const handleSubmit = event => {
    //     console.log(event)
    //     if (audioFile !== {} && _name !== '') {
    //         const data = {
    //             "form-name": "upload", 
    //             "_name": _name, 
    //             "contributor": contributor, 
    //             "description": description, 
    //             "_file" : audioFile
    //         }
            
    //         //send to netlify client, which forwards to aws then to fauna?

    //         fetch("/", {
    //             method: "POST",
    //             headers: {"Content-Type": "multipart/form-data"},
    //             body: encode(data)
    //         })
    //         .then(() => console.log("Submission successful"))
    //         .catch(error => console.log("Submission failed", error))
    //     }  

    //     event.preventDefault()
    // }

    const handleChange = e => {
        const {name, value} = e.target
        if (name === '_name'){
            return setName(value)
        }
        if (name === 'description'){
            return setDescription(value)
        }
        if (name === 'contributor'){
            return setContributor(value)
        }
        // if (name === '_file'){
        //     return setAudioFile(value)
        // }
    }

    return (
        <form name="upload" method="POST" >
            <input type="hidden" name="form-name" value="upload" />
            <p>
                <label>
                    sample name : <input type="text" name="_name" value={_name} onChange={handleChange} />
                </label>
            </p>
            <label>
                <p>
                    name of contributor : <input type="text" name="contributor" value={contributor} onChange={handleChange} ></input>
                </p>
            </label>
            <label>
                <p>
                    description : <input type="text" name="description" value={description} onChange={handleChange} />
                </p>
            </label>
            <label>
                <p>
                    file : <input type="file" name="_file" className="custom-file-input" onChange={handleChange}></input>
                </p>
            </label>
            <button type="submit">upload</button>
        </form>
    )
}

export default UploadForm