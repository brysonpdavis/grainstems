import React, {useState} from 'react'

const UploadForm = () => {
    const [_name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [contributor, setContributor] = useState('')

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
    }

    return (
        <form name="upload" encType="multipart/form-data" method="POST" >
            <input type="hidden" name="form-name" value="upload" />
            <p>
                <label>
                    sample name : 
                    <br />
                    <input type="text" name="_name" value={_name} onChange={handleChange} required/>
                </label>
            </p>
            {/* <label>
                <p>
                    contributor name : 
                    <br />
                    <input type="text" name="contributor" value={contributor} onChange={handleChange} ></input>
                </p>
            </label>
            <label>
                <p>
                    description : 
                    <br />
                    <input type="text" name="description" value={description} onChange={handleChange} />
                </p>
            </label> */}
            <label>
                <p>
                    file : 
                    <br />
                    <input type="file" name="_file" className="custom-file-input" onChange={handleChange} accept="audio/*" required></input>
                </p>
            </label>
            <button type="submit">upload</button>
        </form>
    )
}

export default UploadForm