const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);

dotenv.config();

const app = express();

// Database connection

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connection with DB successfully established');
}).catch(err => {
    console.log('Error occured while connecting to DB ', err);
});


// Session store 
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // for a day ie; 24 hours in milliseconds
}))


app.use(flash());



app.use(express.static('public'));


app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// Global middlewares

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

// setting template engine

app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');



// Routes
require('./routes/web')(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})