This application is a simple application that uses AWS RDS to host a Postgres Database, Elastic Beanstalk to host the API and S3 to host the frontend angular portion.
We're also using CircleCI to facilitate deployment.

## Additional Dependencies
```
- Node v14.15.4 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.10 (LTS) or more recent, Yarn can work but was not tested for this project

- AWS CLI v2
```

## Provision the necessary AWS services needed for running the application:

1. In AWS, provision a publicly available RDS database running Postgres. Make sure to set IP Inbound & Outbound to anywhere
1. In AWS, provision a publicly accessible s3 bucket for hosting the uploaded files.
1. In AWS, create a node.js environment to host the API on

## Deployment

connect your github to CircleCI then:
1. Click the project
1. Go to project settings
1. Add the same environment variables there as you have in the backend folder's .env file, with ENV=prod

Now every time you push to git, your project will be redeployed.