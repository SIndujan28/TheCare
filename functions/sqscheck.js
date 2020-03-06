const AWS = require('aws-sdk');

const sqs = new AWS.SQS({ region: 'ap-southeast-1' });

const AWS_ACCOUNT = process.env.ACCOUNT_ID;
const QUEUE_URL = `https://sqs.eu-west-1.amazonaws.com/${AWS_ACCOUNT}/MyQueue`;

module.exports.hello = (event, context, callback) => {
  const params = {
    MessageBody: 'Hola',
    QueueUrl: QUEUE_URL,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('error:', `Fail Send Message${err}`);

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'ERROR',
        }),
      };

      callback(null, response);
    } else {
      console.log('data:', data.MessageId);

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: data.MessageId,
        }),
      };

      callback(null, response);
    }
  });
};

module.exports.sqsHello = (event, context) => {
  console.log('it was called');

  console.log(event);

  context.done(null, '');
};
