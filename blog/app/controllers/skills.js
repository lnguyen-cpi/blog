
var skillModel = require('../models/skill');
var moment = require('moment');

exports.index = async function(req, res) {
    let listSkills = null;
    await skillModel.GetAll().then( (data) => {

        listSkills = data;
    })
    res.render('skills/index', {
        messageInsert: req.flash('success'),
        listSkills: listSkills
    });
}


exports.add = async function(req, res) {

    res.render('skills/add', {
        message: req.flash("error"),
        errorInsert: req.flash("errorInsert")
    });
}

exports.edit = async function(req, res) {

    let id = req.params.id;
    let skillName = null;
    let skillLevel = null;

    if (id) {

        await skillModel.getbyId(id).then( (row) => {
            skillName = row.name_skill;
            skillLevel = row.level_skill;
        });
    }
    
    res.render('skills/edit', {
        skillName: skillName,
        skillLevel: skillLevel,
        id : id
    });
}

exports.handleEdit = async function(req, res) {

    let name = req.body.nameSkill;
    let level = req.body.levelSkill;
    let id = req.body.id; 

    if (name && level) {
       
        let updateDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let editSucessful = null;

        let dataInsert = [
            name,
            level,
            1,
            updateDate,
            id
        ];
        await skillModel.editSkill(dataInsert).then((changedRow) => {
            editSucessful = changedRow;
        });
        if(editSucessful){
            req.flash('success', 'Edit successfully !');
            res.redirect("/admin/skill");

        } else {
            req.flash('errorEdit', 'Edit failed');
            res.redirect("/admin/skill/edit/:id");
        }
    }
    else {
        req.flash('error', 'Name and Level can not be blank');
        res.redirect("/admin/skill/edit/:id");
    }
}


exports.handle = async function(req, res) {

    let name = req.body.nameSkill;
    let level = req.body.levelSkill;

    if (name && level) {
        // add data in database
        let createDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let updateDate = null;
        let idSkill = null;
        let dataInsert = [
            name,
            level,
            1,
            createDate,
            updateDate
        ];
        await skillModel.insertSkill(dataInsert).then((id) => {
            idSkill= id;
        });
        if(idSkill > 0){
            req.flash('success', 'Insert successfully !');
            res.redirect("/admin/skill");

        } else {
            req.flash('errorInsert', 'Insert failed');
            res.redirect("/admin/skill/add");
        }
    }
    else {
        req.flash('error', 'Name and Level can not be blank');
        res.redirect("/admin/skill/add");
    }
}

exports.deacitve = async (req, res) => {

    let id = req.params.id;
    if (id) {
    
        let editSucessful = null;
        let updateDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let dataInsert = [
            0,
            updateDate,
            id
        ];

        await skillModel.deactiveSkill(dataInsert).then((changedRow) => {
            editSucessful = changedRow;
        });

        if(editSucessful){
            req.flash('success', 'Deactivate successfully !');
            res.redirect("/admin/skill");

        } else {
            req.flash('errorDeactivate', 'Deactivate failed');
            res.redirect("/admin/skill");
        }
    }
    else {
        req.flash('error', 'Name and Level can not be blank');
        res.redirect("/admin/skill");
    }
};