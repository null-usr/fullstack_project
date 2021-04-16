runbook for updating the s3 bucket with our site's frontend

1. npm run build
1. aws s3 cp --recursive --acl public-read ./build s3://<Bucket Name>
1. replace <Bucket Name> with your created bucket name