var passportAdmin = require('../../config/passport');
var aboutModel = require('../models/about');
var moment = require('moment');

exports.index = async (req, res) => {

    let about = "";

    await passportAdmin.GetAbout().then( (data) => {

        about = data;
    })

    res.render('about/edit.ejs', {
        about: about
    });
}


exports.edit = async (req, res) => {

    let id = req.params.id;
    let content = req.body.about;
    let updateDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let isSuccessful = null;

    let dataInsert = [
        content,
        updateDate,
        id
    ]

    await aboutModel.editAbout(dataInsert).then((successful) => {

        isSuccessful = successful;
    });

    if(isSuccessful){
        req.flash('success', 'Edit successfully !');
        res.redirect("/admin/about");

    } else {
        req.flash('errorEdit', 'Edit failed');
        res.redirect("/admin/about/edit/:id");
    }
}