How to set up Elastic Beanstalk in your work directory.
Make sure you've followed the aws_accesskeys.md so that we have access to push code to AWS

1. run `eb init` to initialize Elastic Beanstalk in our folder.
1. edit the generated .elasticbeanstalk/config.yml to contain 
```
deploy:
  artifact: ./dist/Archive.zip
```
to specify that Archive.zip is our source once we deploy
see more [here](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html#eb-cli3-artifact)

1. To actually deploy run
```
npm run build/yarn build then
eb deploy
eb health to make sure it's okay
```