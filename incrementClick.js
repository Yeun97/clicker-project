const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    await Promise.all([incrementTotalClicks(event), incrementUserClicks(event)]).then(() => {
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

function incrementTotalClicks(event){
    const params = {
        TableName: 'Clicks',
        Key: {
            'id': event.id
        },
        UpdateExpression: "ADD clicks :clicks",
        ExpressionAttributeValues:{
            ':clicks': 1
        }
    }
    
    return ddb.update(params).promise();
}

function incrementUserClicks(event){
    const params = {
        TableName: 'UserClicks',
        Key: {
            'name': event.name
        },
        UpdateExpression: "ADD clicks :clicks SET game = :game",
        ExpressionAttributeValues:{
            ':clicks': 1,
            ':game': 'clicker'
        }
    }
    
    return ddb.update(params).promise();
}
