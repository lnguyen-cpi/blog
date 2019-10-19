var mysql = require('mysql');
const dbconfig = require('../../config/database');
const connection = mysql.createConnection(dbconfig.connection);
// select database - very important
connection.query(`USE ${dbconfig.database}`);
var passportAdmin = require('../../config/passport');

exports.home = async function(req, res) {
	
	if(!req.session.adminName){
		req.session.adminName = await passportAdmin.SetAdminName();
	}

	res.render('user-index.ejs', {
		name :  req.session.adminName,
		error :  req.flash("error"),
		success: req.flash("success"),
		session: req.session,
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