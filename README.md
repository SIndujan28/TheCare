# TheCare-serverless
A membership based platform that provides veteran-grade help such as maids,caregivers,electricians,plumbers or drivers to VIP customers.The subscribed premium members can request our services at any time and expect prime first-class service for a reasonable fee.The API is tailored using serverless framework that can be deployed in highly scalable AWS lambda containers and uses AWS cognito to handle user-management.The subscription is handled using stripe.

## Technologies used
1. AWS Lambda
2. AWS API Gateway
3. AWS SQS
4. Stripe
5. Cognito
6. DynamoDB

## List of features for initial API
  * Create members/workers
  * Update member/worker profile
  * Create subscription for member
  * Send invoice if payment due
  * Canceling subscription
  * Request service if subscribed for the particular plan

### Features
  - [x] Integrate AWS SQS for request system to handle events from multiple sources.
  - [x] Add support to invoke from telegramBot.
  - [ ] Add support to invoke from Alexa.

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

To recreate the project,

``` bash
$ git clone git@github.com:SIndujan28/TheCare.git
```

Install the Node.js packages

``` bash
$ npm install
```

### Usage

To run a function on your local

``` bash
$ serverless invoke local --function function_name
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

Deploy your project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function hello
```

#### Running Tests

Run your tests using

``` bash
$ npm test
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).

#### Environment Variables

To add environment variables to your project

1. Rename `env.example` to `.env`.
2. Add environment variables for your local stage to `.env`.
3. Uncomment `environment:` block in the `serverless.yml` and reference the environment variable as `${env:MY_ENV_VAR}`. Where `MY_ENV_VAR` is added to your `.env` file.
4. Make sure to not commit your `.env`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

This repo is uses  [Serverless Node.js Starter](https://github.com/AnomalyInnovations/serverless-nodejs-starter) which is maintained by [Anomaly Innovations](https://anoma.ly)
