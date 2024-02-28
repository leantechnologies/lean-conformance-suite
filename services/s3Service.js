const { S3 } = require('aws-sdk');
const global = require('../global')
require('dotenv').config();
const { bank_list, endpointList } = require('../models/data')
var bucketName = process.env.BUCKETNAME
var namespace = process.env.NAMESPACE
var region = process.env.REGION
var s3
// https://axjj8th4b6iy.compat.objectstorage.me-jeddah-1.oraclecloud.com
var accessKeyId = process.env.ACCESSKEY
var secretAccessKey = process.env.SECRETKEY

async function fetchRawBankResponse () {
    const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey,
        endpoint: `https://` + namespace + `.compat.objectstorage.` + region + `.oraclecloud.com`,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    });

    const bucketParams = {
        Bucket: bucketName
    };

    try {
        const data = await listS3Objects(s3, bucketParams);
        return await getFileData(s3, data, global.bank_identifier, global.user_requested_endpoint);
    } catch (error) {
        throw error;
    }
}

async function listS3Objects(s3, params) {
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

async function getFileData(s3, data, bank, user_requested_endpoint) {
    let exit_flag = false
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
                if (!(data.log.entries[i].request.url).includes('/' + user_requested_endpoint)) {
                    console.log(`No ${user_requested_endpoint} call available in this har file!`)
                    break
                } else {
                    const json_body = JSON.parse(Body);
                    const raw_response = JSON.stringify(json_body.log.entries[i].response.content.text)
                    let filtered_response = raw_response.replace(/\n/g, '')
                    exit_flag = true
                    global.end_point = data.log.entries[i].request.url
                    global.correlationId = key
                    return JSON.parse(filtered_response);
                }
            }
        }
        if (exit_flag) {
            console.log('Parsed bank response!')
            break
        }
    }
}

module.exports = fetchRawBankResponse;