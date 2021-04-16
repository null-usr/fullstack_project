"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const store = new user_1.Userbase();
describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('index method should return an empty list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
    it('create method should add a user', async () => {
        const result = await store.create({
            first_name: 'Bill',
            last_name: 'Nye',
            password: 'science_guy',
        });
        const pepper = process.env.BCRYPT_PASSWORD;
        const res = result.first_name == 'Bill' &&
            result.last_name == 'Nye' &&
            bcrypt_1.default.compareSync('science_guy' + pepper, result.password);
        expect(res).toBeTrue();
        /*expect(result).toEqual({
            id: result.id,
            first_name: 'Bill',
            last_name: 'Nye',
            password: 'science_guy',
        });*/
    });
    it('index method should return a list of one user', async () => {
        const result = await store.index();
        const pepper = process.env.BCRYPT_PASSWORD;
        const res = result[0].first_name == 'Bill' &&
            result[0].last_name == 'Nye' &&
            bcrypt_1.default.compareSync('science_guy' + pepper, result[0].password);
        expect(res).toBeTrue();
        /*expect(result).toEqual([
            {
                id: result[0].id,
                first_name: 'Bill',
                last_name: 'Nye',
                password: 'science_guy',
            },
        ]);*/
    });
});
