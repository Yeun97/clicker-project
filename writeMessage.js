const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    const requestId = context.awsRequestId;
    await createMessage(requestId, event).then(() => {
        callback(null, {
            statusCode: 201,
            body: '',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        })
    }).catch((err) => {
        console.error(err)
    });
};

function createMessage(requestId, event){
    const params = {
        TableName: 'Message',
        Item: {
            'date': Date.now(),
            'message': event.message,
            'name': event.name,
            'game': 'clicker'
        }
    }
    
    return ddb.put(params).promise();
}
