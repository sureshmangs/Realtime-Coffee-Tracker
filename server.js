const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();



app.use(express.static('public'));



// setting template engine

app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');



// Routes

app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/cart', (req, res) => {
    res.render('customers/cart');
});


app.get('/register', (req, res) => {
    res.render('auth/register');
});


app.get('/login', (req, res) => {
    res.render('auth/login');
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})