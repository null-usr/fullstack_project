import client from '../database';
import { User } from './user';

//for retrieving data from the database
export type Order = {
    id?: number;
    user_id: number;
    status: string;
};

//for sending
export type Orders = {
    id?: number;
    user_id: number;
    product_IDs: number[];
    product_quantities: number[];
    status: string;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders: ${err}`);
        }
    }

    //internal use =======================================================================================
    async get(id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1);';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);

            conn.release();

            if (result.rowCount === 0) {
                throw 'No order by that ID';
            }

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(usr: User, status: string): Promise<Order> {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql =
                'INSERT INTO orders ( user_id, status ) VALUES($1, $2) RETURNING *';

            const conn = await client.connect();

            const result = await conn.query(sql, [usr.id, status]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(
                `Could not create order for user ${usr.id}. Error: ${err}`
            );
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const conn = await client.connect();

            //SERIAL PRIMARY KEY? figure out how to factor that in
            let sql =
                'DELETE FROM order_products WHERE order_products.order_id=($1)';
            await conn.query(sql, [id]);

            sql = 'DELETE FROM orders WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            const order = result.rows[0];

            conn.release();

            if (result.rowCount === 0) {
                throw 'No product by that ID';
            }

            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }

    //internal use ======================================================================================= END

    async addProduct(
        quantity: number,
        orderID: string,
        productID: string
    ): Promise<Order> {
        try {
            const conn = await client.connect();
            //insert our order-product into the order_products table and return the order
            let sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES( $1, $2, $3 );';

            await conn.query(sql, [quantity, orderID, productID]);

            sql = 'SELECT * FROM orders WHERE id=$1';

            const result = await conn.query(sql, [orderID]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(
                `Could not add product ${productID} to order ${orderID}: ${err}`
            );
        }
    }

    async getOrders(o: Order): Promise<Orders> {
        try {
            const conn = await client.connect();
            //essentially want an array of product ids and product quantities
            //this gets us a table of product id and their quantities. can't run twice because of the ordering
            /*const sql = 
				'SELECT product_id, quantity FROM products INNER JOIN order_products ON order_products.order_id = $1;';

			const result = await conn.query( 
				sql, [ o.id ] );*/

            const query = {
                text:
                    'SELECT product_id, quantity FROM products INNER JOIN order_products ON order_products.product_id = products.id WHERE order_products.order_id = $1;',
                values: [o.id],
                rowMode: 'array',
            };

            const result = await conn.query(query);

            const products: number[] = [];
            const quantities: number[] = [];
            const data = result.rows;

            data.forEach((element) => {
                products.push(element[0]);
                quantities.push(element[1]);
            });

            const orders: Orders = {
                id: o.id,
                user_id: o.user_id,
                status: o.status,
                product_IDs: products,
                product_quantities: quantities,
            };

            conn.release();

            return orders;
        } catch (err) {
            throw new Error(
                `Could not get the products in order ${o.id}: ${err}`
            );
        }
    }

    async getUserOrder(id: number): Promise<Orders> {
        try {
            //select from the order table where user_id is our id
            const conn = await client.connect();

            const sql = 'SELECT * FROM orders WHERE orders.user_id = $1;';

            const result = await conn.query(sql, [id]);

            if (result.rowCount === 0) {
                throw 'No user by that ID';
            }
            const order: Order = result.rows[0];

            return this.getOrders(order);
        } catch (err) {
            throw new Error(`Could not get the order for user ${id}: ${err}`);
        }
    }
}
