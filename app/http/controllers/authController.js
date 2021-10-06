const path = require('path');
const User = require("../../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport')

function authController(req, res) {
    return {
        login: function (req, res) {
            res.render('auth/login');
        },
        postLogin: function (req, res, next) {
            const { email, password } = req.body
            // Validate request 
            if (!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    //for extracting the logged in username
                    objId = req.session.passport.user
                    User.findOne({ _id: objId }).then((data) => {
                        return data.name;
                    }).then((name) => {
                        res.render("users/dashboard", { name })
                    })
                })
            })(req, res, next);

        },
        register: function (req, res) {
            res.render('auth/register');
        },
        postRegister: async function (req, res) {
            //object destructuring
            const { name, email, password, confirmPassword } = req.body

            if (!name || !email || !password || !confirmPassword) {
                console.log(req.body);
                req.flash("error", "All fields are required");
                req.flash("name", name);
                req.flash("email", email);
                return res.redirect('/register');
            }

            //check if mail exists
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash("error", "Email already exists");
                    req.flash("name", name);
                    req.flash("email", email);
                    return res.redirect('/register');
                }
            });

            //checking if password confirms or not
            if (password != confirmPassword) {
                req.flash("error", "Password doesn't match");
                req.flash("name", name);
                req.flash("email", email);
                return res.redirect('/register');
            }

            //hashPassword
            const hashedPassword = await bcrypt.hash(password, 10);

            //CreateUser
            const user = new User(
                {
                    name: name,
                    email: email,
                    password: hashedPassword,

                });

            user.save().then((user) => {
                //login
                res.render("users/dashboard.ejs", { name });
            }).catch((err) => {
                req.flash("error", "Something went wrong")
                return res.redirect("/register");
            })

        },
        logout : function(req,res)
        {
            req.logout();
            return res.redirect('/login');
        }
    }
}

module.exports = authController;