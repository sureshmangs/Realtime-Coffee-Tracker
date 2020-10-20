const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');

const app = express();



app.use(express.static('public'));



// setting template engine

app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');



// Routes
require('./routes/web')(app);


const MONGODB_URI = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

try {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('connection with DB successfully established');
    });
} catch (err) {
    console.log('Error occured while connecting to DB ', err);
};


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})