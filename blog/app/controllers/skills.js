
var skillModel = require('../models/skill');
var moment = require('moment');
var paginate = require('express-paginate');

exports.index = async function(req, res) {


    let listSkills = null;
    let keyword = req.query.keyword;
    let limit = req.query.limit;
    let pageCount = 0;
    let page = req.query.page || 1;

    console.log(paginate);
   
    await skillModel.GetAll(keyword).then( (data) => {
        listSkills = data;
        pageCount = Math.ceil(listSkills.length / limit);
    })


    res.render('skills/index', {
        messageInsert: req.flash('success'),
        listSkills: listSkills,
        keyword: keyword,
        pageCount: pageCount,
        page: req.query.page || 1,
        pages: paginate.getArrayPages(req)(3, pageCount, page),
        paginate: paginate,
        limit: limit
    });
}


exports.add = async function(req, res) {
    let errorData = req.flash("error");

    res.render('skills/add', {
        message: errorData,
        errorInsert: req.flash("errorInsert")
    });
}

exports.edit = async function(req, res) {

    let id = req.params.id;
    let infoSkill = null;

    if (id) {
        await skillModel.getbyId(id).then( (row) => {
            infoSkill = row;
        });
    }
    
    res.render('skills/edit', {
        // skillName: skillName,
        // skillLevel: skillLevel,
        info: infoSkill,
        id : id
    });
}

exports.handleEdit = async function(req, res) {

    let name = req.body.nameSkill;
    let level = req.body.levelSkill;
    let id = req.params.id; 
    let status = req.body.statusSkill;

    if (name && level) {
       
        let updateDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let editSucessful = null;

        let dataInsert = [
            name,
            level,
            status,
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

    req.checkBody('nameSkill', 'nameSkill is required and not longer than 200 chars').notEmpty().isLength({ max: 200 });
    req.checkBody('levelSkill','nameSkill is required and numeric type').notEmpty().isNumeric();

    let errors = req.validationErrors();

    if (!errors) {
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
        req.flash('error', errors);
        res.redirect("/admin/skill/add");
    }
}


exports.deacitveSkill = async (req, res) => {
    let id = req.body.id;
    id = Number.parseInt(id);
    if(id > 0){
        // thuc hien viec update du lieu
        let updateDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let dataInsert = [
            0,
            updateDate,
            id
        ];

        await skillModel.deactiveSkill(dataInsert).then((flagDelete) => {
            editSucessful = flagDelete;
        });

        if(editSucessful){
            res.send("ok");

        } else {
            res.send("fail");
        }

    } else {
        res.send('error');
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