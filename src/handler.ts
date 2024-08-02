import { APIGatewayProxyHandler } from "aws-lambda";

export const hello: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello from TypeScript with Serverless v4!",
        input: event,
      },
      null,
      2
    ),
  };
};
