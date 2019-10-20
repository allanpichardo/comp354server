const Product = require('../models/product');
const Category = require('../models/category');
const Manufacturer = require('../models/manufacturer');
const Response = require('../api/response');

/**
 * This class encapsulates all the logic of
 * product API functions
 * @type {ProductController}
 */
module.exports = class ProductController {

    /**
     * Return all products by page
     * @param req
     * @param res
     */
    static getAllProducts(req, res) {
        try{
            let page = req.query.page && req.query.page > 0 ? parseInt(req.query.page) : 1;
            let max = req.query.max && req.query.max > 0 ? parseInt(req.query.max) : 10;
            let sort = req.query.sort;
            let asc = !!req.query.asc;

            Product.getAllSorted((err, products, pageCount) => {
                if(err) {
                    res.send(Response.makeResponse(false, err.toString()));
                    return;
                }

                res.send(Response.makeResponse(true, `Got page ${page}`, products, pageCount));

            }, page, max, sort, asc);

        }catch (e) {
            res.send(Response.makeResponse(false, e.toString()));
        }

    }

    /**
     * Return a single product by ID
     * @param req
     * @param res
     */
    static getProduct(req, res) {
        try {
            let id = req.params.id;
            Product.fromId(id, (err, product) => {
                if(err) {
                    res.send(Response.makeResponse(false, err.toString()));
                    return;
                }

                let success = !!product;
                // let success = product != null ? true : false;
                let message = success ? 'Product found' : 'Product not found';

                if(success) {
                    product.getCompleteObject((err, json) => {
                        res.send(Response.makeResponse(success, message, json));
                    });
                } else {
                    res.send(Response.makeResponse(success, message));
                }
            });
        } catch(e) {
            res.send(Response.makeResponse(false, e.toString()));
        }
    }

    /**
     * Get list of categories
     * @param req
     * @param res
     */
    static getAllCategories(req, res) {
        try {
            let page = req.query.page && req.query.page > 0 ? parseInt(req.query.page) : 1;
            let max = req.query.max && req.query.max > 0 ? parseInt(req.query.max) : 10;

            Category.getAll((err, categories) => {
                if(err) {
                    res.send(Response.makeResponse(false, err.toString()));
                    return;
                }

                res.send(Response.makeResponse(true, `Got page ${page}`, categories));
            }, page, max);
        } catch(e) {
            res.send(Response.makeResponse(false, e.toString()));
        }
    }

    /**
     * Return a single category by id
     * @param req
     * @param res
     */
    static getCategory(req, res) {
        try {
            let id = req.params.id;

            Category.fromId(id, (err, category) => {
                if(err) {
                    res.send(Response.makeResponse(false, err.toString()));
                    return;
                }

                res.send(Response.makeResponse(true, `Got category`, category));
            });
        }catch (e) {
            res.send(Response.makeResponse(false, e.toString()));
        }
    }

    static getAllManufacturers(req, res) {
        try {
            let page = req.query.page && req.query.page > 0 ? parseInt(req.query.page) : 1;
            let max = req.query.max && req.query.max > 0 ? parseInt(req.query.max) : 10;

            Manufacturer.getAll((err, categories) => {
                if(err) {
                    res.send(Response.makeResponse(false, err.toString()));
                    return;
                }

                res.send(Response.makeResponse(true, `Got page ${page}`, categories));
            }, page, max);
        } catch(e) {
            res.send(Response.makeResponse(false, e.toString()));
        }
    }

    static getManufacturer(req, res) {
        try {
            let id = req.params.id;

            Manufacturer.fromId(id, (err, category) => {
                if(err) {
                    res.send(Response.makeResponse(false, err.toString()));
                    return;
                }

                res.send(Response.makeResponse(true, `Got manufacturer`, category));
            });
        }catch (e) {
            res.send(Response.makeResponse(false, e.toString()));
        }
    }

    /**
     * Delete specific product
     * @param req
     * @param res
     */
    static deleteProduct(req, res) {
        try{
            let id = req.params.id;
            Product.fromId(id, (err, product) => {
                if(err) {
                    res.send(Response.makeResponse(false, err.toString()));
                    return;
                }
                product.delete((err, success) => {
                    if(err) {
                        res.send(Response.makeResponse(false, err.toString()));
                        return;
                    }
                    let message = success ? 'Product deleted' : 'Product not deleted';

                    res.send(Response.makeResponse(success, message));
                    }
                )
            });
        }catch (e) {
            res.send(Response.makeResponse(false, e.toString()));
        }

    }
};