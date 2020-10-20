const homepageController = require('../app/helpers/controllers/homepageController');
const authController = require('../app/helpers/controllers/authController');
const cartController = require('../app/helpers/controllers/customers/cartController');

function initRoutes(app) {
    app.get('/', homepageController().index);

    app.get('/cart', cartController().cart);

    app.get('/register', authController().register);

    app.get('/login', authController().login);
}

module.exports = initRoutes;