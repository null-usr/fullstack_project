"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get products: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rowCount === 0) {
                throw 'No product by that ID';
            }
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    //password hashing here ====================================================================
    async create(prd) {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql = 'INSERT INTO products (name, price, category, description, url) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const conn = await database_1.default.connect();
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
        }
        catch (err) {
            throw new Error(`Could not add new product ${prd.name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            if (result.rowCount === 0) {
                throw 'No product by that ID';
            }
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
