import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    url: string;
    description: string;
    category?: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products: ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);

            conn.release();

            if (result.rowCount === 0) {
                throw 'No product by that ID';
            }

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    //password hashing here ====================================================================
    async create(prd: Product): Promise<Product> {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql =
                'INSERT INTO products (name, price, category, description, url) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const conn = await client.connect();

            const result = await conn.query(sql, [
                prd.name,
                prd.price,
                prd.category,
                prd.description,
                prd.url
            ]);

            const product = result.rows[0];

            conn.release();

            return product;
        } catch (err) {
            throw new Error(
                `Could not add new product ${prd.name}. Error: ${err}`
            );
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const product = result.rows[0];

            conn.release();

            if (result.rowCount === 0) {
                throw 'No product by that ID';
            }

            return product;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
