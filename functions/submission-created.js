const AWS = require("aws-sdk")
const fetch = require("node-fetch")

exports.handler = async (event, context) => {
    AWS.config.update({
        region: 'us-east-1',
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.MY_AWS_COGNITO_ID
        })
    })
        
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

    var upload = new AWS.S3.ManagedUpload({
        params: uploadParams
    })    

    var response = await upload.promise()

    console.log('response', response)

    const {GraphQLClient, gql} = require('graphql-request')

    const client = new GraphQLClient('https://graphql.fauna.com/graphql',{
        headers: {
            Authorization: `Bearer ${process.env.MY_FAUNA_KEY}`
        }
    })

    const mutation = gql`
    mutation {
        addStem(
            name: $name
            url: $url
            description: $description
            contributer: $contributer
        ) {
            name
            url
            description
            contributer
            id
        }
    }
    `
    const variables = {
        name: data._name,
        url: response.Location,
        description: data.description,
        contributer: data.contributer
    }

    const gqlResponse = await client.request(mutation, variables)

    console.log('gql response : ', gqlResponse)
    console.log('stringified : ', JSON.stringify(gqlResponse))

    return { statusCode: 200, body: JSON.stringify(gqlResponse) }
}