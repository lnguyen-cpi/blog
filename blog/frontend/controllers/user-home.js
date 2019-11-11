var mysql = require('mysql');
const dbconfig = require('../../config/database');
const connection = mysql.createConnection(dbconfig.connection);
// select database - very important
connection.query(`USE ${dbconfig.database}`);
var passportAdmin = require('../../config/passport');

exports.home = async function(req, res) {
	

	let skills = [];
	let about = "";
	let experiences = [];
	let education = [];

	if(!req.session.adminName){
		req.session.adminName = await passportAdmin.SetAdminName();
	}

	await passportAdmin.GetSkills().then((rows)=>{
		skills = rows;
	});

	await passportAdmin.GetAbout().then((data) => {
		about = data.Content;
	});

	await passportAdmin.GetExperience().then((data) => {
		experiences = data;
	});

	await passportAdmin.GetEducation().then((data) => {
		education = data;
	});



	res.render('user-index.ejs', {
		name :  req.session.adminName,
		skills: skills,
		about: about,
		experiences: experiences,
		education: education
	 });
}

exports.register = function(req, res) {
	
	if(req.session.user) {
		res.redirect('/admin/user');
	}
	res.render('register.ejs');
}


exports.indexBlog = function(req, res) {
	res.render("indexblog");
}