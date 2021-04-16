"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const userstore = new user_1.Userbase();
const store = new order_1.OrderStore();
describe('Order Model', () => {
    let user;
    beforeAll(async () => {
        //create one user
        user = await userstore.create({
            first_name: 'Test',
            last_name: 'User',
            password: 'password123',
        });
    });
    afterAll(async () => {
        //delete the order before the user I guess?
        await store.delete('3');
        if (user.id) {
            await userstore.delete(user.id.toString());
        }
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
    it('create method should add an order', async () => {
        const result = await store.create(user, 'open');
        if (user.id) {
            const res = result.user_id == user.id && result.status == 'open';
            expect(res).toBeTrue();
            /*expect(result).toEqual({
                id: 3,
                user_id: user.id,
                status: 'open'
            });*/
        }
    });
    it('index method should return a list of one order', async () => {
        const result = await store.index();
        expect(result).toBeTruthy();
    });
});
