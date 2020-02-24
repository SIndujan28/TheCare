import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.workerTableName,
    Item: {
      workerId: event.requestContext.identity.cognitoIdentityId,
      fullName: data.fullName,
      gender: data.gender,
      age: data.age,
      contactNumber: data.contactNumber,
      address: data.address,
      nic: data.nic,
      skill: data.skill,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
