const path = require("path");
const Note = require("../../models/note");

// Factory method:
function searchController() {
  return {
    index: function (req, res) {
      res.render("users/searchNotes.ejs");
    },

    postSearch: function (req, res) {
      let searchValue = req.body.searchValue
      
      // for extracting the logged in username:
      userId = req.session.passport.user;

      Note.find({user : userId, title : searchValue}).then((allNotes)=>{
          console.log(allNotes);
      })

      return res.send(searchValue);
    },
  };
}

module.exports = searchController;
