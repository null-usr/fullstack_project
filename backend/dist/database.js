"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, AWS_DB_HOST, AWS_DB_NAME, AWD_DB_USER, AWS_DB_PASSWORD, AWS_DB_PORT, ENV, } = process.env;
let port;
if (process.env.POSTGRES_PORT && (ENV === 'test' || ENV === 'dev')) {
    port = parseInt(process.env.POSTGRES_PORT) || 5432;
}
else if (AWS_DB_PORT) {
    port = parseInt(AWS_DB_PORT) || 5432;
}
else {
    port = 5432;
}
//to get typescript off my back..
let client = new pg_1.Pool();
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: port || 5432,
    });
}
else if (ENV === 'prod') {
    client = new pg_1.Pool({
        host: AWS_DB_HOST,
        database: AWS_DB_NAME,
        user: AWD_DB_USER,
        password: AWS_DB_PASSWORD,
        port: port || 5432,
    });
}
else {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: port || 5432,
    });
}
exports.default = client;
