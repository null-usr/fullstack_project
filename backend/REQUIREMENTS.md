# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
	-> '/products' [GET]

- Show
	-> '/products/:id' [GET]

- Create [token required]
	-> '/products' [POST]

- [OPTIONAL] Top 5 most popular products 
	-> My assumption would be to sum each product's order quantities and then sort that in descending order, limit 5
- [OPTIONAL] Products by category (args: product category)
	->'/product/<category>' presumably

#### Users
- Index [token required]
	-> '/users' [GET]

- Show [token required]
	-> '/users/:id' [GET]

- Create N[token required]
	-> '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]
	-> '/users/:userID/orders/current'
	or 
	->'/orders/:id'

- [OPTIONAL] Completed Orders by user (args: user id)[token required]
	-> '/users/:userID/orders/complete' presumably

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


# Database Design
Table: users (id:SERIAL PRIMARY KEY, first_name:string, last_name:string, password:string)

Table: products ( id:SERIAL PRIMARY KEY, name:string, price:float, category:string )

Table: orders ( id:SERIAL PRIMARY KEY, user_id bigint REFERENCES users(id), status: VARCHAR(100))

Join table, the quantity references how much of the product is to be included with the order
Table: order_products ( id:SERIAL PRIMARY KEY, quantity:integer, order_id bigint REFERENCES orders(id), product_id bigint REFERENCES products(id) )
