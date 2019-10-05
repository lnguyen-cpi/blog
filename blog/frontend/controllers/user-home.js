


exports.home = async function(req, res) {
	
	res.render('user-index.ejs', {
		title : "Blog",
		error : req.flash("error"),
		success: req.flash("success"),
		session:req.session,
	 });


	 
}