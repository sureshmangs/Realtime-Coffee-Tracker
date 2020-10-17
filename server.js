const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('homepage');
})

// setting template engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})