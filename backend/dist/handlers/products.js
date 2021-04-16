"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jwt_middleware_1 = require("../jwt_middleware");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        res.json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            url: req.body.url,
            description: req.body.description,
        };
        const newproduct = await store.create(product);
        res.json(newproduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const product = await store.delete(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', jwt_middleware_1.verifyAuthToken, create);
    app.delete('/products/:id', destroy);
};
exports.default = product_routes;
