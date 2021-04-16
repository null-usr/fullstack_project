runbook for updating the s3 bucket with our site's frontend

npm run build
aws s3 cp --recursive --acl public-read ./build s3://udagram-ntc-bucket