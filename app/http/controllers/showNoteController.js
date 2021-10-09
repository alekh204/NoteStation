const path = require('path');
const Note = require('../../models/note');
const User = require('../../models/user');
const passport = require('passport');

function showNoteController(req, res) {
    return {
        index: function (req, res) {
            objId = req.session.passport.user
            User.findOne({ _id: objId }).then((data) => {
                return data.name;
            }).then((name)=>
                { 
                   userId = req.session.passport.user;
                   Note.find({user : userId}).then((allNotes)=>{
                       res.render("users/showNotes", {allNotes : allNotes, name : name})
                   })
                })
        }
    }
}


    module.exports = showNoteController;