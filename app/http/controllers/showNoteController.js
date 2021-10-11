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
                    res.render("users/showNotes", { allNotes: allNotes, name: name, count : 0 });
                   })
                })
        },

        deleteNote : function(req, res){
            console.log(req.body.id);
            noteId = req.body.id;
            Note.deleteOne({ _id: noteId }, function (err) {
              if(err) console.log(err);
              console.log("Successful deletion");
              return res.redirect('/showNotes');
            });
        }
    }
}


    module.exports = showNoteController;