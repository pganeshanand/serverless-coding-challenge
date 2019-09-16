# serverless-coding-challenge

This REST API will check if a user is in Amazon Cognito and write information to Amazon DynamoDB about that checked user.

#### Prerequisite:

##### Install node js

Refer [Node Website](https://nodejs.org/en/)
Verify node js installation in command window using

```sh
node --version
```

##### Install serverless

Can be done either in global (or) local scope using command window,
Global scope use the below command

```sh
npm install -g serverless
```

Local(project) scope use the below command

```sh
npm install serverless
```

Verify serverless install through command window

```sh
serverless --version
```

##### Install aws-cli

Through command window

```sh
pip install aws-cli
```

###### Note

- The above installation works if python is already installed, if not please install python.
  Verify aws-cli install in command window using

```sh
aws --version
```

#### Assumptions:

This code does not create users in Amazon Cognito. It assumes users are created by some other process. For instance, users can be created manually in Admin console after creation of Userpools.

To deploy, you should
have the default aws credentials file in local machine
(or)
pass the keys through serverless commands as below,

```sh
serverless config credentials --provider aws --key <Access key ID> --secret <Secret access key>
```

(or) aws commands as below,

```sh
aws configure
AWS Access Key ID [None]: <Access key ID>
AWS Secret Access Key [None]: <Secret access key>
Default region name [None]: <Region name>
Default output format [None]:
```

###### Note

- <Region name> - 'ap-southeast-2' can be used since it is the closer.
- This Access key ID should have either admin access or atleast permisson for all our resources used (AWS Cognito, AWS Lambda, AWS S3, AWS DynamoDB, AWS API Gateway)

#### Process to Deploy

Use the below command

```sh
serverless deploy -v
```

(or)

```sh
sls deploy -v
```

###### Note

- '-v' gives the more details during deployment proceess.
- On successful deployment logs in console will show the complete endpoint url for '/verify'. Similar as below,
  https://3zfr83ghp5.execute-api.ap-southeast-2.amazonaws.com/dev/users/verify

#### Test the API

Create the user details with username in Cognito userpool manually. Here username field should be a valid email id.

To access the REST API we should have URL parameter as 'userId'
eg. URL,
https://3zfr83ghp5.execute-api.ap-southeast-2.amazonaws.com/dev/users/verify?userId=pganeshanand@gmail.com

Response are shown in the browser based on the results of user checks.

###### The successful user check

> will make a entry in dynamoDb with user details which can be verified through Admin Console.

###### The failure of user check,

> will display the appropriate message and will not make any entry in dynamoDB.

Any other failure are logged with the standard error message.
