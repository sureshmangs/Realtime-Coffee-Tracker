const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init() {
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        // find the user given the email
        const user = await User.findOne({ "email": email });

        // if not, handle it
        if (!user) {
            return done(null, false, { message: 'No user found with this email' });
        }

        // check if password is correct
        bcrypt.compare(password, user.password)
            .then(match => {
                if (match) {
                    return done(null, user, { message: 'Logged in successfully' });
                }
                return done(null, false, { message: 'Wrong email or password' });
            }).catch(err => {
                return done(null, false, { message: 'Something went wrong' });
            })

    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }, (err, user) => {
            done(err, user);
        })
    })
}

module.exports = init;