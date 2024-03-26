// @ts-nocheck

import { S3 } from 'aws-sdk';
import global from '../global';
require('dotenv').config();
import { bank_list, endpointList } from '../models/data';
var bucketName = process.env.HTTP_LOGGING_BUCKET_NAME
var region = process.env.HTTP_LOGGING_BUCKET_REGION
var s3_endpoint = process.env.HTTP_LOGGING_BUCKET_ENDPOINT
if (!s3_endpoint) {
    throw new Error(`S3 endpoint is null/undefined: ${s3_endpoint}`)
}
var accessKeyId = process.env.HTTP_LOGGING_BUCKET_ACCESS_KEY
var secretAccessKey = process.env.HTTP_LOGGING_BUCKET_SECRET_KEY
let s3: S3 
async function fetchRawBankResponse() {
    s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey,
        endpoint: s3_endpoint,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    })

    const bucketParams = {
        Bucket: bucketName,
        Prefix: global.bank_identifier
    };

    try {
        const data = await listS3Objects(s3, bucketParams);
        return await getFileData(s3, data, global.bank_identifier, global.user_requested_endpoint);
    } catch (error) {
        throw error;
    }
}

async function listS3Objects(s3: S3, params) {
    return new Promise((resolve, reject) => {
        s3.listObjects(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function getFileData(s3: S3, data, bank, user_requested_endpoint) {
    let exit_flag = false
    console.log('number of files: ' + data.Contents.length)
    for (let index = 0; index < data.Contents.length; index++) {

        let key = data.Contents[index].Key.toString();
        if (key.includes(bank)) {
            const params = {
                Bucket: bucketName,
                Key: key
            }

            const { Body } = await s3.getObject(params).promise()
            const data = JSON.parse(Body);
            for (let i = 0; i < data.log.entries.length; i++) {
                const url = data.log.entries[i].request.url;
                console.log('URL: ' + url)
                if (url.endsWith('/' + user_requested_endpoint) || url.includes('transactions')) {
                    const json_body = JSON.parse(Body);
                    const raw_response = JSON.stringify(json_body.log.entries[i].response.content.text)
                    let filtered_response = raw_response.replace(/\n/g, '')
                    global.end_point = data.log.entries[i].request.url
                    global.correlationId = data.log.comment
                    console.log(JSON.parse(filtered_response))
                    return JSON.parse(filtered_response);
                }
            }
        }
    }
    console.log('No file for this endpoint and bank found')
}

module.exports = fetchRawBankResponse;