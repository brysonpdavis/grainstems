const AWS = require("aws-sdk")

exports.handler = async (event, context) => {
    // const s3 = new AWS.S3({
    //     accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    // })

    // uploadParams = {Bucket: 'grainstems', Key: '', Body: ''}
    // file = event.

    console.log('multiple logs')

    console.log('event.body: ', event.body)
}