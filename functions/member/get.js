import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event) {
  const params = {
    TableName: process.env.memberTableName,
    Key: {
      memberId: event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const response = await dynamoDbLib.call('get', params);
    if (response.Item) {
      return success(response.Item);
    }
    return failure({ status: false, error: 'info not found' });
  } catch (e) {
    return failure({ status: false });
  }
}
