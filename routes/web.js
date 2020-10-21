const homepageController = require('../app/helpers/controllers/homepageController');
const authController = require('../app/helpers/controllers/authController');
const cartController = require('../app/helpers/controllers/customers/cartController');
const guest = require('../app/helpers/middlewares/guest');

function initRoutes(app) {
    app.get('/', homepageController().index);

    app.get('/cart', cartController().cart);

    app.get('/register', guest, authController().register);

    app.post('/register', authController().postRegister);

    app.get('/login', guest, authController().login);

    app.post('/login', authController().postLogin);

    app.post('/logout', authController().logout);

    app.post('/update-cart', cartController().update);
}

module.exports = initRoutes;