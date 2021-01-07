import React, {useState} from 'react'

const UploadForm = () => {
    const [name, setName] = useState('')
    const [audioFile, setAudioFile] = useState({})
    const [description, setDescription] = useState('')
    const [contributor, setContributor] = useState('')

    const encode = (data) => {
        const formData = new FormData()
        Object.keys(data).forEach(k=>{
            formData.append(k, data[k])
        })
        return formData
    }

    const handleSubmit = event => {
        if (false && audioFile !== {} && name !== "") {
            const data = {"form-name" : "upload", name, description, contributor, audioFile}
            
            //send to netlify client, which forwards to aws then to fauna?

            fetch("/", {
                method: "POST",
                headers: {"Content-Type": "multipart/form-data"},
                body: encode(data)
            })
            .then(() => console.log("Submission successful"))
            .catch(error => console.log("Submission failed", error))
        }  
        event.preventDefault()
    }

    const handleChange = e => {
        const {name, value} = e.target
        if (name === 'name'){
            return setName(value)
        }
        if (name === 'description'){
            return setDescription(value)
        }
        if (name === 'contributor'){
            return setContributor(value)
        }
        if (name === 'file'){
            return setAudioFile(value)
        }
    }

    return (
        <form name="upload" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="upload" />
            <label>
                <p>
                    sample name : <input type="text" name="name" value={name} onChange={handleChange} />
                </p>
            </label>
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
                    file : <input type="file" name="file" className="custom-file-input" onChange={handleChange}></input>
                </p>
            </label>
            <button type="submit">upload</button>
        </form>
    )
}

export default UploadForm