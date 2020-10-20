function homepageController() {
    return {
        index(req, res) {
            res.render('homepage');
        }
    }
}

module.exports = homepageController;