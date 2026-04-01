const Account = require("../../models/account-model");
const Role = require("../../models/role-model");
var md5 = require('md5');
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const accounts = await Account.find(find).select("-password -token");
    // console.log(accounts);
    for (const account of accounts) {
        let role = await Role.findOne({
            deleted: false,
            _id: account.role_id
        })
        account.role = role;
    }
    console.log(accounts);

    res.render("admin/pages/accounts/account.pug", {
        pageTitle: "",
        accounts: accounts
    })

}
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const roles = await Role.find(find);
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Tạo tài khoản",
        roles: roles
    })
}
module.exports.createPost = async (req, res) => {
    let find = {
        deleted: false,
        email: req.body.email
    }

    const emailExist = await Account.findOne(find);
    if (emailExist) {
        req.flash("error", "Tài khoản email đã tồn tại! ");
        const backUrl = req.get("Referer")
        return res.redirect(backUrl);
    }

    try {
        req.body.password = md5(req.body.password);
        const account = new Account(req.body);
        await account.save();
        req.flash("success", "Tạo mới tài khoản thành công");
        const backUrl = req.get("Referer")
        res.redirect(backUrl);


    } catch (error) {
        req.flash("error", "Tạo mới tài khoản thất bại");
        const backUrl = req.get("Referer")
        res.redirect(backUrl);
    }





}

module.exports.edit = async (req, res) => {
    let find = {
        deleted: false
    }
   
    const roles = await Role.find(find);
    let find1 ={
        deleted: false,
        _id: req.params.id
    }
    const account = await Account.findOne(find1);
    
    res.render("admin/pages/accounts/edit.pug", {
        pageTitle: "",
        roles: roles,
        data: account

    })
}
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const emailExist = await Account.findOne({
        deleted: false,
        email: req.body.email,
        _id: {$ne: id}

    }
    )  ;
    if(emailExist){
        req.flash("error", "Tài khoản email đã tồn tại! ");
        const backUrl = req.get("Referer")
        return res.redirect(backUrl);
    }
    if(req.body.password == ""){
        delete req.body.password
    }else{
        req.body.password = md5( req.body.password);
    }
    // console.log(emailExist);
    try {
        
        await Account.updateOne({_id:id

        },req.body);
        req.flash("success", "Chinh sua thanh cong");
        const backUrl = req.get("Referer")
        res.redirect(backUrl);


    } catch (error) {
        req.flash("error", "Tạo mới tài khoản thất bại");
        const backUrl = req.get("Referer")
        res.redirect(backUrl);
    }
}