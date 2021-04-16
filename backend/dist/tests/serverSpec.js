"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order_1 = require("../models/order");
const user_1 = require("../models/user");
const product_1 = require("../models/product");
const userstore = new user_1.Userbase();
const productstore = new product_1.ProductStore();
const orderstore = new order_1.OrderStore();
const request = supertest_1.default(server_1.default);
describe('Test endpoint responses', () => {
    it('gets the root endpoint', async (done) => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        //apparently calling done is deprecated, but if i don't call done
        //the code just stalls out..
        done();
    });
    let user = {
        first_name: 'unloaded',
        last_name: 'data',
        password: 'default',
    };
    //jwt
    let token = '';
    //const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdF9uYW1lIjoidGVzdCIsImxhc3RfbmFtZSI6InVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCR4ZnMzZTZpWk5OeVZtaVNvL2hJWGYuTm5COXVQVS4vZi91UnFlM0p3RGZEVWhOYWouQWppbSJ9LCJpYXQiOjE2MTc5MTcwNTN9.BxbWT61YTCwgz2Kl-r3ABCcwd8qu1w5ZSB0wszgoZdA"
    let user2;
    let order1;
    let order2;
    let p1;
    let p2;
    let p3;
    let p4;
    let p5;
    beforeAll(async () => {
        //create one user
        /*user = await userstore.create({
            first_name: 'Test',
            last_name: 'User',
            password: 'password123',
        });*/
        //this now returns a token
        const response = await request.post('/users').send({
            first_name: 'test',
            last_name: 'user',
            password: 'password123',
        });
        token = response.body.token;
        //console.log(token);
        const tmp = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        user = tmp.user;
        //console.log(user);
        //create 4 products
        p1 = await productstore.create({
            name: 'Hamburger',
            price: 500.0,
            category: 'Weaponized Beef',
            url: '',
            description: ''
        });
        p2 = await productstore.create({
            name: 'Pizza',
            price: 200.0,
            category: 'Italian',
            url: '',
            description: ''
        });
        p3 = await productstore.create({
            name: 'Hard drive',
            price: 600.0,
            category: 'Technology',
            url: '',
            description: ''
        });
        p4 = await productstore.create({
            name: 'USB Key',
            price: 100.0,
            category: 'Technology',
            url: '',
            description: ''
        });
        //create 2 orders
        order1 = await orderstore.create(user, 'open');
        order2 = await orderstore.create(user, 'open');
    });
    //delete the users products and orders from the database
    afterAll(async () => {
        if (order1.id && order2.id) {
            await orderstore.delete(order2.id.toString());
            await orderstore.delete(order1.id.toString());
        }
        if (p1.id && p2.id && p3.id && p4.id) {
            await productstore.delete(p1.id.toString());
            await productstore.delete(p2.id.toString());
            await productstore.delete(p3.id.toString());
            await productstore.delete(p4.id.toString());
        }
        if (user.id) {
            await userstore.delete(user.id.toString());
        }
    });
    describe('Test Users endpoints', () => {
        it('gets the users endpoint without a token', async (done) => {
            const response = await request.get('/users');
            expect(response.status).toBe(401);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('gets the users endpoint', async (done) => {
            const response = await request.get('/users').send({ token: token });
            expect(response.status).toBe(200);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('cant get the user 100 endpoint without a token', async (done) => {
            const response = await request.get('/users/100');
            expect(response.status).toBe(401);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('cant get the user 100 endpoint even with a token', async (done) => {
            const response = await request
                .get('/users/100')
                .send({ token: token });
            expect(response.status).toBe(400);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('creates a new user', async (done) => {
            const response = await request.post('/users').send({
                first_name: 'test',
                last_name: 'user',
                password: 'password123',
            });
            const user2_token = response.body.token;
            const tmp = jsonwebtoken_1.default.verify(user2_token, process.env.TOKEN_SECRET);
            user2 = tmp.user;
            expect(response.status).toBe(200);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('gets the test user endpoint without a token', async (done) => {
            const user_endpoint_path = `/users/${user.id}`;
            const response = await request.get(user_endpoint_path);
            expect(response.status).toBe(401);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('gets the test user endpoint with a token', async (done) => {
            const user_endpoint_path = `/users/${user.id}`;
            const response = await request
                .get(user_endpoint_path)
                .send({ token: token });
            expect(response.status).toBe(200);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('cant delete the new user without a token', async (done) => {
            const user_endpoint_path = `/users/${user2.id}`;
            const response = await request.delete(user_endpoint_path);
            expect(response.status).toBe(401);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('deletes the new user ', async (done) => {
            const user_endpoint_path = `/users/${user2.id}`;
            const response = await request
                .delete(user_endpoint_path)
                .send({ token: token });
            expect(response.status).toBe(200);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
    });
    describe('Test Products endpoints', () => {
        it('gets the products endpoint', async (done) => {
            const response = await request.get('/products');
            expect(response.status).toBe(200);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('cant get the product 100 endpoint', async (done) => {
            const response = await request.get('/products/100');
            expect(response.status).toBe(400);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('gets the product endpoint', async (done) => {
            const product_endpoint_path = `/products/${p1.id}`;
            const response = await request.get(product_endpoint_path);
            expect(response.status).toBe(200);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('creates a new product', async (done) => {
            const response = await request.post('/products').send({
                name: 'test product',
                price: 100,
                category: 'test',
                token: token,
            });
            p5 = {
                id: response.body.id,
                name: response.body.name,
                price: response.body.price,
                category: response.body.category,
                url: '',
                description: ''
            };
            expect(response.status).toBe(200);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('deletes the new user', async (done) => {
            const product_endpoint_path = `/products/${p5.id}`;
            const response = await request.delete(product_endpoint_path);
            expect(response.status).toBe(200);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
    });
    describe('Test Orders endpoints', () => {
        it('cant get the order 100 endpoint', async (done) => {
            const response = await request
                .get('/orders/100')
                .send({ token: token });
            expect(response.status).toBe(400);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
        it('gets the test order endpoint', async (done) => {
            const order_endpoint_path = `/orders/${user.id}`;
            const response = await request
                .get(order_endpoint_path)
                .send({ token: token });
            expect(response.status).toBe(200);
            //apparently calling done is deprecated, but if i don't call done
            //the code just stalls out..
            done();
        });
    });
});
