"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userbase = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class Userbase {
    //constructor(parameters) {
    //}
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get users: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rowCount === 0) {
                throw 'No user by that ID';
            }
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    //password hashing here ====================================================================
    async create(usr) {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            const saltRounds = parseInt(process.env.SALTROUNDS);
            const pepper = process.env.BCRYPT_PASSWORD;
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(usr.password + pepper, saltRounds);
            const result = await conn.query(sql, [
                usr.first_name,
                usr.last_name,
                hash,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${usr.first_name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql = 'DELETE FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            if (result.rowCount === 0) {
                throw 'No product by that ID';
            }
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
    async authenticate(id, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            if (result.rows.length) {
                const user = result.rows[0];
                const pepper = process.env.BCRYPT_PASSWORD;
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
                return null;
            }
            //could be a vulnerability
            //throw "No user with such an ID exists.";
            return null;
        }
        catch (err) {
            throw new Error(`Could not authenticate user ${id}. Error: ${err}`);
        }
    }
}
exports.Userbase = Userbase;
