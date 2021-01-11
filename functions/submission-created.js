const AWS = require("aws-sdk")
const fetch = require("node-fetch")

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
    // const response = await fetched.json()
    // console.log('response', response.toString())
    const blob = await fetched.blob()
    const arrayBufferBlob = await blob.arrayBuffer()
    const fileToUpload = Buffer.from(arrayBufferBlob)
    // console.log(fileToUpload.toString())
        
    const uploadParams = {
        Bucket: 'grainstems', 
        Key: AWSFileKey, 
        ContentType: fileType,
        Body: fileToUpload
    }

    try {
        var upload = new AWS.S3.ManagedUpload({
            params: uploadParams
        })    

        var response = await upload.promise()

        console.log('response', response)
    
        if (error) return { statusCode: 500, body: JSON.stringify(error) }

        // ADD FAUNADB MUTATION HERE

    return { statusCode: 200, body: JSON.stringify(result) }

    } catch (e) {
        return { statusCode: 500, body: e.message }
    }
}