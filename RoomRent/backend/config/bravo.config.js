const SibApiV3Sdk = require('sib-api-v3-sdk');
require("dotenv").config()
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];

apiKey.apiKey = process.env.EMAIL_API_KEY;

module.exports = SibApiV3Sdk;