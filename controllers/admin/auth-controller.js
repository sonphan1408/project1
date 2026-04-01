const Role = require("../../models/role-model");
const Account = require("../../models/account-model");
var md5 = require('md5')
module.exports.login = async (req,res) => {

    res.render("admin/pages/auth/login.pug",{
        pageTitle : "Dang nhap"

    })
    
}
module.exports.loginPost = async (req,res) => {
    const user = req.body.email;
    const password = req.body.password;
    console.log(req.body.email);
    const checkUser = await Account.findOne({
        email: user,
        deleted: false
    })
    if(!checkUser){
        req.flash("error","Sai tai khoan hoac mat khau");
        return res.redirect("/admin/auth/login")
    }
    console.log(md5(password));
    console.log(checkUser.password);

    const checkPassword = (checkUser.password == md5(password) ? true : false);
    if(!checkPassword){
        req.flash("error","Sai tai khoan hoac mat khau");
        return res.redirect("/admin/auth/login")
    }
    res.cookie("token",checkUser.token);
    res.redirect("/admin/dashboard");

}
module.exports.logout = async (req,res) => {
    res.clearCookie("token");
    res.redirect("/admin/auth/login");

}

