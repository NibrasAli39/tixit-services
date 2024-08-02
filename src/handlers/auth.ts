import { APIGatewayProxyHandler } from "aws-lambda";
import {
  generateToken,
  hashPassword,
  comparePassword,
} from "../services/authService";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const register: APIGatewayProxyHandler = async (event) => {
  const { data } = JSON.parse(event.body || "");
  const hashedPassword = await hashPassword(data.password);

  const params = {
    TableName: process.env.DYNAMODB_TABLE_USERS!,
    Item: {
      id: data.email,
      password: hashedPassword,
      ...data,
    },
  };

  await dynamoDb.put(params).promise;

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "User sucessfully registered" }),
  };
};

// export const login: APIGatewayProxyHandler = async (event) => {
//   const { data } = JSON.parse(event.body || "");

//   const params = {
//     TableName: process.env.DYNAMODB_TABLE_USERS!,
//     Key: { id: data.email },
//   };

//   const result = await dynamoDb.get(params).promise;
// };
