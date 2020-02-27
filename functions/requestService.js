import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event) {
  event.Records.forEach(record => {
    const { body } = record;
    const params = {
      TableName: process.env.workerTableName,
      ExpressionAttributeValues: {
        ':skill': {
          S: body.skill,
        },
        ':avail': {
          S: true,
        },
      },
      FilterExpression: 'skill = :skill AND available = :avail',
    };
    try {
      const response =await dynamoDbLib.call('scan', params);
    } catch (e) {
      return failure({ status: false });
    }
  });
}
