"use strict";
const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

// Function to fetch userInfo from Cognito based on userId
async function getUserInfo(userId) {
  const user = await cognito
    .adminGetUser({
      UserPoolId: process.env.userPool,
      Username: userId
    })
    .promise();

  console.log(user.UserAttributes);
  return user.UserAttributes;
}

// Function to save the userDetails with userId in DynamoDB
async function saveToDynamoDB(userId, userDetails) {
  var params = {
    TableName: process.env.userInfoTable,
    Item: {
      UserID: userId,
      UserDetails: userDetails
    }
  };
  await dynamo
    .put(params, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    })
    .promise();
}

// Function to initate the Lambda
module.exports.handler = async event => {
  console.log(process.env.userPool);
  var userId = event.queryStringParameters.userId;
  try {
    var userDetails = await getUserInfo(userId);
    await saveToDynamoDB(userId, userDetails);
    console.log(`userDetails: , ${userDetails}`);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `User ${userId} is verfied in Cognito and User Info is saved in Dynamo DB !`,
          UserDetails: userDetails
        },
        null,
        2
      )
    };
  } catch (error) {
    if (error.code == "UserNotFoundException") {
      return {
        statusCode: 404,
        body: JSON.stringify(
          {
            message: `User ${userId} is not present in Cognito !`
          },
          null,
          2
        )
      };
    } else {
      console.log(`userDetails in Catch: , ${userDetails}`);
      return {
        statusCode: 500,
        body: JSON.stringify(
          {
            message: `Oops this is not expected. Please try after some time`
          },
          null,
          2
        )
      };
    }
  }
};
