import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event) {
  const params = {
    TableName: process.env.workerTableName,
    Key: {
      workerId: event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    await dynamoDbLib.call('delete', params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
