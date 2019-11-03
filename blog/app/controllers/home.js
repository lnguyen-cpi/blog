var homeModel = require('../models/home');

/*
exports.loggedIn = function(req, res, next)
{
	if (req.session.user) { // req.session.passport._id

		next();

	} else {

		res.redirect('/admin/login');
	}
	next();
}
*/

exports.home = async function(req, res) {

	let data = [];
	 await homeModel.getCategories().then((dt) => {
		data = dt;
	});

	res.render('home/index', {
		title : "",
		error : req.flash("error"),
		success: req.flash("success"),
		session:req.session,
	 });
}


exports.signup = function(req, res) {

	if (req.session.user) {
		res.redirect('/home');
	} else {
		res.render('signup', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}

}


exports.login = function(req, res) {

	if (req.session.user) {
		res.redirect('/home');
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
}


exports.update = function(req, res) {

	res.render('update');
}


    
