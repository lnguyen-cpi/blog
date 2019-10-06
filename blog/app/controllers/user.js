exports.index = function(req, res) {
    // hien thi giao dien list data user
    res.render('user/index', {
        error : req.flash("error"),
        success: req.flash("success"),
        session:req.session
    });
}

exports.formInsert = function(req, res) {
    // hform view - de cho admin tao tk
    // method get - hien thi form
    res.render('user/add', {
        error : req.flash("error"),
        success: req.flash("success"),
        session:req.session
    });
}



exports.handleInser = function(req, res) {
    // goi model insert data
    // method post - goi ngoai router
}



exports.formUpdate = function(req, res) {
    // hform view - de cho admin tao tk
    // method get - hien thi form
    res.render('user/edit', {
        error : req.flash("error"),
        success: req.flash("success"),
        session:req.session
    });
}

// ajax - Jquery