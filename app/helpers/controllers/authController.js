const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController() {
    return {
        register(req, res) {
            res.render('auth/register');
        },


        async postRegister(req, res) {
            const { name, email, password } = req.body;

            // validate request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            if (password.length < 8) {
                req.flash('error', 'Password should have minimum 8 characters');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            // check if user already exist 
            await User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already taken');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }
            })

            // password hashing

            const hashedPassword = await bcrypt.hash(password, 10);   // 10 is the salt

            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            await newUser.save()
                .then((user) => {
                    // login functionality

                    return res.redirect('/')
                })
                .catch(err => {
                    req.flash('error', 'Something went wrong');
                    return res.redirect('/register');
                })
        },


        login(req, res) {
            res.render('auth/login');
        },


        async postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }

                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message);
                        return next(err);
                    }
                    return res.redirect('/')
                })
            })(req, res, next);
        },


        logout(req, res) {
            req.logout();
            return res.redirect('/')
        }
    }
}

module.exports = authController;