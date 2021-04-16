"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jwt_middleware_1 = require("../jwt_middleware");
const store = new order_1.OrderStore();
const current_order = async (req, res) => {
    try {
        const orders = await store.getUserOrder(parseInt(req.params.id));
        res.json(orders);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const order_routes = (app) => {
    app.get('/orders/:id', jwt_middleware_1.verifyAuthToken, current_order);
};
exports.default = order_routes;
