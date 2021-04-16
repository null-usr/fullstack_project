runbook for setting up the AWS RDS Postgres Database

1. Sign into the AWS Console and navigate to RDS
1. Create a PostgreSQL database with standard create, taking note of the credentials settings and setting public access to "yes" 
1. Under Additional configuration at the bottom set the initial database name to whatever you want it to be
1. Once the database is created, click it to get access to the information needed for the backend folder's .env file

AWS_DB_HOST = Endpoint
AWS_DB_PORT = port
AWS_DB_NAME = the initial database name
AWD_DB_USER = the username you took note of in the credentials settings
AWS_DB_PASSWORD = the password you took note of

If you can't connect to your database, even via psql listed below, [Check this](https://serverfault.com/questions/656079/unable-to-connect-to-public-postgresql-rds-instance)
1. Create a new security group for the database
1. Create a new rule where inbound and outbound is anywhere


If you forgot to set the initial database name, you'll run into an error stating the database you're trying to connect to doesn't exist
To fix this:
1. psql --host=DB_instance_endpoint --port=port --username=master_user_name --password --dbname=username
1. run `CREATE DATABASE <database_name>;`
1. `\q`