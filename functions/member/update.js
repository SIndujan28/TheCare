import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

const generateUpdateQuery = (fields) => {
  const exp = {
    UpdateExpression: 'set',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };
  Object.entries(fields).forEach(([key, item]) => {
    exp.UpdateExpression += `#${key} = :${key},`;
    exp.ExpressionAttributeNames[`#${key}`] = key;
    exp.ExpressionAttributeValues[`:${key}`] = item;
  });
  exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
  return exp;
};

export async function main(event) {
  const body = JSON.parse(event.body);
  const expression = generateUpdateQuery(body);
  const params = {
    TableName: process.env.memberTableName,
    Key: {
      memberId: event.requestContext.identity.cognitoIdentityId,
    },
    ...expression,
    ReturnValues: 'ALL_NEW',
  };
  try {
    const response = await dynamoDbLib.call('update', params);
    return success(response.Attributes);
  } catch (e) {
    return failure({ status: false });
  }
}
