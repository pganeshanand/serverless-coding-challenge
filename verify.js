"use strict";

module.exports.handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "User Verification function is called Successfully !"
        // TODO - Cognito verification and write to dynamoDB in progress
      },
      null,
      2
    )
  };
};
