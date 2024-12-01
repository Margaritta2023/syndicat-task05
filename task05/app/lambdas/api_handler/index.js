const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
       
        const requestBody = JSON.parse(event.body);
      
        const eventId = uuid.v4();
        
        const eventItem = {
            id: eventId,
            ...requestBody,
            createdAt: new Date().toISOString()
        };
        
        const params = {
            TableName: 'Events',
            Item: eventItem
        };

        await dynamoDb.put(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Event created successfully!',
                event: eventItem
            })
        };
    } catch (error) {
        console.error('Error saving event:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to create event',
                error: error.message
            })
        };
    }
};
