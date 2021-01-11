const AWS = require("aws-sdk")
const fetch = require("node-fetch")
const fs = require('fs')

exports.handler = async (event, context) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
    })
    
    const data = JSON.parse(event.body).payload.data
    const fileName = data._file.filename
    const fileType = data._file.type
    const url = data._file.url
    const AWSFileKey = `${Math.floor(Math.random() * 10000000).toString()}-${fileName}`
    const fileToUpload = await fetch(url).then(r => r.blob())
    console.log(JSON.stringify(fileToUpload))
        
    const uploadParams = {
        Bucket: 'grainstems', 
        Key: fileName, 
        ContentType: fileType,
        Body: fileToUpload
    }


    const upload = s3.upload(uploadParams)
    const result = upload.promise()
    console.log('promise', result)
    result.then(r => console.log('promise result: ', r))

    return {
        
    }

    // s3.getSignedUrlPromise('putObject', uploadParams)
    // .then(uploadURL => 
    //     fetch (uploadURL, {
    //         method: 'PUT',
    //         body: fileToUpload
    //     }
    // ))
    // .then(r => console.log(r))
    // .catch(error => console.log(error))
}