const path = require('path');
const Note = require('../../models/note');

function showNoteController(req, res) {
    return {
        index: function (req, res) {
            Note.find().then((allNotes) => {

                console.log(allNotes);
                res.render('users/showNotes');
            })
        }
    }
}


module.exports = showNoteController;