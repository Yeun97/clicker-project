const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    await getMostClicks().then(data => {
        // data.Items.forEach(function(item){
        //     console.log(item.clicks)
        // });
        callback(null, {
            statusCode: 200,
            body: data.Items,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
    }).catch((err) => {
        console.error(err);
    })
};

function getMostClicks() {
    
    const params = {
        TableName: 'UserClicks',
        IndexName: 'game-clicks-index'
    }
    
    return ddb.scan(params).promise();
}
