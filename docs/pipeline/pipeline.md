This project uses CircleCI as its CI/CD Platform.

Once code is pushed to the git repo, CircleCI installs the required dependencies, performs a build, runs tests on the build and then deploys the newly created production application to S3 and Elastic Beanstalk.