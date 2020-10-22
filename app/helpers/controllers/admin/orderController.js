const Order = require('../../../models/order')

function orderController() {
    return {
        orders(req, res) {
            Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } })
                .then(orders => {
                    if (req.xhr)
                        return res.json(orders);
                    else return res.render('admin/orders');
                })
        }
    }
}

module.exports = orderController;