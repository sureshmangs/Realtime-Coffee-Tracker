const Menu = require('../../models/menu');

function homepageController() {
    return {
        async index(req, res) {
            const coffees = await Menu.find();
            return res.render('homepage', { 'coffees': coffees });
        }
    }
}

module.exports = homepageController;