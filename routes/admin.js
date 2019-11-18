const express = require('express');
const path = require('path');
const routes = express.Router();//makes the middleware exportable

const rootDir = require('../util/path');

const products = [];

routes.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        docTitle: 'Add products',
        productCss: true,
        formCss: true,
        activeCls: true
    });
});

routes.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.routes = routes;
exports.products = products;