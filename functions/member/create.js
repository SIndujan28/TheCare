import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.memberTableName,
    Item: {
      memberId: event.requestContext.identity.cognitoIdentityId,
      fullName: data.fullName,
      contactNumber: data.contactNumber,
      address: data.address,
      nic: data.nic,
      propertyDocument: data.propertyDocument,
      occupation: data.occupation,
      incomeLevel: data.incomeLevel,
      createdAt: Date.now(),
      stripe: {},
    },
  };
  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
