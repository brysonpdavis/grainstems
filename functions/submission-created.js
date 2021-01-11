const AWS = require("aws-sdk")
const fetch = require("node-fetch")
const fs = require('fs')

exports.handler = async (event, context) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    })
    
    const data = JSON.parse(event.body).payload.data
    const fileName = data._file.filename
    const fileType = data._file.type
    const url = data._file.url
    const AWSFileKey = `${Math.floor(Math.random() * 10000000).toString()}-${fileName}`
    const fileToUpload = await fetch(url).then(r => r.blob())
        
    const uploadParams = {
        Bucket: 'grainstems', 
        Key: AWSFileKey, 
        ContentType: fileType,
        // Body: fileToUpload
    }


    // result = await s3.upload(uploadParams)
    s3.getSignedUrlPromise('putObject', uploadParams)
    .then(uploadURL => 
        fetch (uploadURL, {
            method: 'PUT',
            body: fileToUpload
        }
    ))
    .then(r => console.log(result))
}