const homepageController = require('../app/helpers/controllers/homepageController');
const authController = require('../app/helpers/controllers/authController');
const cartController = require('../app/helpers/controllers/customers/cartController');
const orderController = require('../app/helpers/controllers/customers/orderController');
const adminOrderController = require('../app/helpers/controllers/admin/orderController');
const statusController = require('../app/helpers/controllers/admin/statusController');
// Middlewares
const guest = require('../app/helpers/middlewares/guest');
const auth = require('../app/helpers/middlewares/auth');
const admin = require('../app/helpers/middlewares/admin');




function initRoutes(app) {
    // homepage routes
    app.get('/', homepageController().index);

    // cart routes
    app.get('/cart', cartController().cart);
    app.post('/update-cart', cartController().update);

    // Auth routes
    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);
    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);
    app.post('/logout', authController().logout);

    // order routes
    app.post('/orders', auth, orderController().store);
    app.get('/customer/orders', auth, orderController().orders);
    app.get('/customer/orders/:id', auth, orderController().show);

    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().orders);
    app.post('/admin/orders/status', admin, statusController().status);
}

module.exports = initRoutes;