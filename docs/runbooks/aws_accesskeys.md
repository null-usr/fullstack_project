To allow us to have permission to push our code to AWS we need to have access keys.

1. In the AWS console, navigate to IAM
1. Click users and then add user
1. Give the user a name and grant it programmatic access and continue
1. Add the user to whichever group is appropriate, create a group if needed. In my case I created an admin group.
1. Add whatever tags you want, then continue to create the user
1. Once the user is created, you'll have the option to either Show secret access key or Download .csv file. This is the only time you can do this, so make sure you save the key and secret somewhere you'll remember.
1. On windows you need to save this to `C:\Users\username\.aws\credentials` and on linux/mac `~/.aws/credentials`
```
[default]
aws_access_key_id = <ID VALUE>
aws_secret_access_key = <SECRET VALUE>
```