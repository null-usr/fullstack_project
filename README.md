# Storefront

http://udagram-ntc-bucket.s3-website-us-east-1.amazonaws.com/

This application is the combination of the previous projects in the Udacity Fullstack nanodegree. 
It is a simple application that uses AWS RDS to host a Postgres Database, Elastic Beanstalk to host the API and S3 to host the frontend angular portion.

## Getting Started

1. Clone this repo locally into the location of your choice.
1. Open a terminal and navigate to the root of the repo
1. follow the instructions in the installation step

### Dependencies

```
- Node v14.15.4 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.10 (LTS) or more recent, Yarn can work but was not tested for this project

- AWS CLI v2, v1 can work but was not tested for this project

- Elastic Beanstalk CLI

- An RDS database running Postgres.

- An S3 bucket for hosting uploaded pictures.

- AN Elastic Beanstalk Environment to host the API on

```

### Installation

Provision the necessary AWS services needed for running the application:

1. In AWS, provision a publicly available RDS database running Postgres. Make sure to set IP Inbound & Outbound to anywhere
1. In AWS, provision a publicly accessible s3 bucket for hosting the uploaded files.
1. In AWS, create a node.js environment to host the API on
1. Export the ENV variables needed or use a package like [dotnev](https://www.npmjs.com/package/dotenv)/.
1. From the root of the repo, navigate to the backend folder `cd backend` and install the node_modules `npm install`. 
1. After installation is done, follow the additional instructions inside of both the frontend and backend folders' README.md
1. Once the instructions have been followed, open a terminal and navigate to the backend `cd backend` start the api in dev mode with `npm run dev`.
1. Without closing the terminal in the previous step 1, navigate to the frontend `cd frontend` and run dev mode with `npm run start`.

## Testing

This project contains two different test suite: unit tests and End-To-End tests(e2e). Follow these steps to run the tests.

# For frontend:
1. `cd frontend`
1. `npm run test`
1. `npm run e2e`

# For backend:
1. Follow the instructions in the backend folder's README.md

### Unit Tests:

Unit tests are using the Jasmine Framework.

### End to End Tests:

The e2e tests are using Protractor and Jasmine.

## Deployment

Before you can deploy, make sure you have your AWS access keys configured.
Check the docs/runbooks/aws_accesskeys.md if you don't know how to do this.

### Configuration

## local Elastic Beanstalk setup

For deployment, you'll either need to edit backend/.elastickbeanstalk/config.yml to use your application environment or run eb init from inside the backend folder
and set it up from there.
If you use eb init, make sure to add 

```deploy:
  artifact: ./dist/Archive.zip
```

to the bottom of the generated .elastickbeanstalk/config.yml

## Elastic Beanstalk Environment Variables

1. Go into your Elastic Beanstalk Console on AWS
1. Select your environment
1. Go to Configuration > Software > Edit
1. Scroll to the Environment properties section and add the environment variables you configured in the backend folder's .env file with the values you want, importantly set ENV to prod. 

## S3
Edit frontend/bin/deploy.sh to use your s3://<your_bucket_name> 

### Initialize and Test Production Database
Make sure that your local host of the API can access the database.

change the ENV value in the backend folder's .env file to prod and do the following
```
cd backend
npm run prod
or 
npm run prod:windows (if you're on windows)
```
This will run a db-migrate up on the production database.
If there are any connection issues, check docs/runbooks/rds_setup.md

### Building & Deploying

In the root of the project (this folder) run 
```
npm run backend:build
npm run frontend:build
npm run backend:deploy
npm run frontend:deploy
```

If you're on windows run `backend:build:windows` and `backend:deploy:windows`

For additional information, check the docs folder


## Built With

- [Angular](https://angular.io/) - Single Page Application Framework
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework

## License

[License](LICENSE.txt)
