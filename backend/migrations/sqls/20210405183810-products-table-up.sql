CREATE TABLE products (
	 id SERIAL PRIMARY KEY, 
	 name VARCHAR(100) NOT NULL, 
	 price DECIMAL(12,2) NOT NULL, 
	 description TEXT,
	 url TEXT,
	 category VARCHAR(64) 
);