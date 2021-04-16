"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const userstore = new user_1.Userbase();
const productstore = new product_1.ProductStore();
const orderstore = new order_1.OrderStore();
/*
    Create two orders and 4 products, order some of each
*/
describe('Store Model', () => {
    let user = {
        first_name: 'unloaded',
        last_name: 'data',
        password: 'default',
    };
    let order1;
    let order2;
    let p1;
    let p2;
    let p3;
    let p4;
    beforeAll(async () => {
        //create one user
        user = await userstore.create({
            first_name: 'Test',
            last_name: 'User',
            password: 'password123',
        });
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
    it('should have a get orders method', () => {
        expect(orderstore.getOrders).toBeDefined();
    });
    it('should add products to orders', async () => {
        if (order1.id && order2.id && p1.id && p2.id && p3.id && p4.id) {
            await orderstore.addProduct(1, order1.id.toString(), p1.id.toString());
            await orderstore.addProduct(2, order1.id.toString(), p2.id.toString());
            await orderstore.addProduct(1, order1.id.toString(), p3.id.toString());
            await orderstore.addProduct(1, order2.id.toString(), p4.id.toString());
            const result1 = await orderstore.getOrders(order1);
            const result2 = await orderstore.getOrders(order2);
            /*console.log(result1);
            console.log(result2);*/
            const result = result1.product_IDs.length == 3 &&
                result1.product_quantities.length == 3 &&
                result2.product_quantities.length == 1 &&
                result2.product_IDs.length == 1 &&
                result1.user_id == user.id &&
                result2.user_id == user.id;
            expect(result).toBe(true);
        }
        else {
            expect(true).toBe(false);
        }
    });
});
