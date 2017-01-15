let express = require('express');
let router = express.Router();


//Get Homepage
router.get('/',ensureAuthenicated,function(req,res){
    res.render('index');
});


function ensureAuthenicated(req,res){
    if(req.isAuthenticated()){
        return next();
    } else{
       // req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;
