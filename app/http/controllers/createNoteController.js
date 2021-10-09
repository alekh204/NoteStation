const path = require('path');
const Note = require('../../models/note')
const User = require("../../models/user");
const passport = require('passport');

function createNoteController(req, res) {
    return {
        index: function (req, res) {
            objId = req.session.passport.user
            User.findOne({ _id: objId }).then((data) => {
                console.log(data);
                return data.name;
            }).then((name) => {
                res.render("users/createNote", { name : name })
            })

        },
        postIndex: function (req, res) {
            const { title , desc } = req.body;
            if (req.body.title === '' || req.body.desc === '') {
                // req.flash('error', 'Please fill both the fields');
                // req.flash('color', 'danger');
                // return res.redirect('/createNote');
                let x =
                {
                    'msg': 'FAILED! Please fill in all the field',
                    'color': 'danger'
                }
                console.log(req.body);
                res.send(x);
            }
            else 
            {
                const note = new Note({
                    title: title.trim(),
                    description: desc,
                    user:req.session.passport.user
                });

                note.
                    save()
                    .then((note) => {
                        let x =
                        {
                            'msg': 'Note Created',
                            'color': 'success'
                        }
                        res.send(x);

                    })
            }
        }
    }
}

module.exports = createNoteController;
