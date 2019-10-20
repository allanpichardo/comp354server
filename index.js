require('dotenv').config();
const path = require('path');
const express = require('express');
const multer  = require('multer');
const app = express();
const mime = require('mime');
const Response = require('./src/api/response');
const ProductController = require('./src/controllers/productcontroller');

const publicDirectory = path.join(__dirname, 'public');
const productImageUploads = multer({storage: getProductImageStorage()});
const profileImageUploads = multer({storage: getProfileImageStorage()});

const port = process.env.PORT || 3030;
app.use(express.static(publicDirectory));

/*================== Add your routes here =====================*/

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/categories/', (req, res) => {
    ProductController.getAllCategories(req, res);
});

app.get('/categories/:id/', (req, res) => {
    ProductController.getCategory(req, res);
});

app.get('/manufacturers/', (req, res) => {
    ProductController.getAllManufacturers(req, res);
});

app.get('/manufacturers/:id/', (req, res) => {
    ProductController.getManufacturer(req, res);
});

app.get('/products/', (req, res) => {
    ProductController.getAllProducts(req, res);
});

app.get('/products/:id/', (req, res) => {
    ProductController.getProduct(req, res);
});

app.delete('/products/:id/', (req, res) => {
    ProductController.deleteProduct(req, res);
});

/* Add a new product
route: /products
post fields:
-
 */
app.post('/products/', productImageUploads.any(), (req, res) => {

});


/*================== End Routes =====================*/

/* -----------------Config Stuff------------------- */
app.listen(port, () => console.log(`Server listening on port ${port}!`));

function getProductImageStorage() {
    return multer.diskStorage({
        destination: path.join(publicDirectory, 'products'),
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
            });
        }
    });
}

function getProfileImageStorage() {
    return multer.diskStorage({
        destination: path.join(publicDirectory, 'profiles'),
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
            });
        }
    });
}