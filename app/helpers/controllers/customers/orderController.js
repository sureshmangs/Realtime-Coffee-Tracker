const Order = require('../../../models/order');
const dayjs = require('dayjs');

function orderController() {
    return {
        store(req, res) {
            const { phone, address } = req.body;
            if (!phone || !address) {
                req.flash('error', 'All fields are required');
                return res.redirect('/cart');
            }

            const order = new Order({
                customerId: req.user._id,
                name: req.user.name,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })

            order.save()
                .then(result => {
                    req.flash('success', 'Order placed successfully');
                    delete req.session.cart; // deleting the cart items
                    return res.redirect('/customer/orders');
                })
                .catch(err => {
                    req.flash('error', 'Something went wrong');
                    return res.redirect('/cart');
                })
        },


        async orders(req, res) {
            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } });    // sorting in descending order of time

            // for not showing orders added message on every visit to customer/orders
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

            res.render('customers/orders', { orders: orders, dayjs: dayjs });
        }
    }
}

module.exports = orderController;