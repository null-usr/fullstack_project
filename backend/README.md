<h3>Create main and test databases using psql:</h3>
>psql \<username\>
>
>CREATE DATABASE udacity_storefront;
>
>CREATE DATABASE udacity_storefront_test;

https://www.guru99.com/postgresql-create-database.html

create database.json 
<pre>
{
	"dev": {
	  "driver": "pg",
	  "host": YOUR_DB_HOST,
	  "database": "your_dev_db_name",
	  "user": "username",
	  "password": "password"
	},
	"test": {
	  "driver": "pg",
	  "host": YOUR_DB_HOST,
	  "database": "your_test_db_name",
	  "user": "username",
	  "password": "password"
	}
}</pre>

and run 
>db-migrate up


<h3>Create your .env file and place it in the root of the project</h3> 
<pre>
	POSTGRES_HOST=YOUR_DB_HOST
	POSTGRES_DB=your_dev_db_name
	POSTGRES_TEST_DB=your_test_db_name
	POSTGRES_USER=username
	POSTGRES_PASSWORD=password
	ENV=<test> or <dev>
	BCRYPT_PASSWORD=your-bcrypt-password
	SALT_ROUNDS=<integer>
	TOKEN_SECRET=your_token_secret
</pre>

run 
>yarn
to install all of the modules

run 
>yarn start 
to run in test mode

set your ENV in the .env file to test and run
>yarn test 
to run the tests

run 
>build && node dist/server 
to run distribution
