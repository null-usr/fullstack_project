"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_middleware_1 = require("../jwt_middleware");
const store = new user_1.Userbase();
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(parseInt(req.params.id));
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        //res.json(newUser);
        //return token instead of user
        res.json({ token: token });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const user = await store.delete(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const user_routes = (app) => {
    app.get('/users', jwt_middleware_1.verifyAuthToken, index);
    app.get('/users/:id', jwt_middleware_1.verifyAuthToken, show);
    app.post('/users', create);
    app.delete('/users/:id', jwt_middleware_1.verifyAuthToken, destroy);
};
exports.default = user_routes;
