const AWS = require("aws-sdk")
const fetch = require("node-fetch")
const fs = require('fs')

exports.handler = async (event, context) => {
    AWS.config.update({
        region: 'us-east-1',
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.MY_AWS_COGNITO_ID
        })
    })
    
    // const s3 = new AWS.S3({
    //     params: { Bucket: 'grainstems' }
    // })
    
    const data = JSON.parse(event.body).payload.data
    const fileName = data._file.filename
    const fileType = data._file.type
    const url = data._file.url
    const AWSFileKey = `${Math.floor(Math.random() * 10000000).toString()}-${fileName}`
    const fetched = await fetch(url)
    console.log('fetched', fetched)
    const response = await fetched.json()
    console.log('response', response.toString())
    const fileToUpload = await response.blob()
    console.log(fileToUpload.toString())
        
    const uploadParams = {
        Bucket: 'grainstems', 
        Key: fileName, 
        ContentType: fileType,
        Body: fileToUpload
    }


    var upload = new AWS.S3.ManagedUpload({
        params: uploadParams
    })

    var promise = upload.promise()
    console.log('promise', promise)
    promise.then(r => console.log('promise result: ', r))

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