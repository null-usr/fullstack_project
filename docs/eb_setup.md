how to set up eb in your work directory

eb init
in our case storefront-app
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html#eb-cli3-artifact
edit .elasticbeanstalk/config.yml to contain 
deploy:
  artifact: path/to/buildartifact.zip
in our case our Archive.zip

npm run build/yarn build then
eb deploy
eb health to make sure it's okay