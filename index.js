
'use strict';
        
const aws = require('aws-sdk');

const s3 = new aws.S3();

exports.handler = async (event, context) => {
    let imageStorage = [];
    //console.log('Received event:', JSON.stringify(event, null, 2));
    // Get the object from the event and show its content type
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const bucket = event.Records[0].s3.bucket.name;
    const params = {
        Bucket: bucket,
        Key: key
    }; 
    try {
        const response = await s3.getObject(params).promise();
        imageStorage = response.Contents.map(image => {
          let imgObj ={
            name: image.Key,
            size: image.Size,
            type: "image"
          }
          return imgObj;
        })
    } catch (err) {
        console.log(err);
        const message = `Error getting object from bucket ${bucket}. Make sure your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
    console.log(JSON.stringify(event), JSON.stringify(imageStorage))
    return 's3 bucket trigger this';
};
