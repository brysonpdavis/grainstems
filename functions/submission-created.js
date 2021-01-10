const AWS = require("aws-sdk")

exports.handler = async (event, context) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    })

    console.log('aws key : ', process.env.MY_AWS_ACCESS_KEY_ID, 'aws secret : ', process.env.MY_AWS_SECRET_ACCESS_KEY)

    console.log('event.body : ', event.body)
    
    const data = event.body.data

    console.log(data)

    const fileName = data._file.filename
    const fileType = dtaa._file.type
    const url = data._file.url
    const AWSFileKey = `${Math.floor(Math.random() * 10000000).toString()}-${fileName}`
    const fileToUpload = await fetch(url).then(r => r.blob()).then(b => new File([b], AWSFileKey))
        
    const uploadParams = {
        Bucket: 'grainstems', 
        Key: AWSFileKey, 
        Expires: 300,
        ContentType: fileType
    }

    const uploadURL = await s3.getSignedUrlPromise('putObject', uploadParams)
    const result = await fetch (uploadURL, {
        method: 'PUT',
        body: fileToUpload
    })

    console.log(result)
}