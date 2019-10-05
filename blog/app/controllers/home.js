var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var homeModel = require('../models/home');

exports.loggedIn = function(req, res, next)
{
	if (req.session.user) { // req.session.passport._id

		next();

	} else {

		res.redirect('/login');
	}
	next();
}

exports.home = async function(req, res) {
	let dta = [];
	 await homeModel.getCategories().then((dt) => {
		data =dt;
	});

	res.render('index.ejs', {
		title : "Blog",
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
	// if (req.session.user) {

	// 	res.redirect('/home');

	// } else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	//}
	
}


    
