const Role = require("../../models/role-model");
module.exports.index = async (req,res) => {

    let find ={
        deleted: "false"
    }
    const records = await Role.find(find);
    console.log(records);
    res.render("admin/pages/roles/role.pug",{
        pageTitle : "Nhom quyền",
        records: records

    })
}
module.exports.create = async (req,res) => {
    res.render("admin/pages/roles/create.pug",{
        pageTitle : "Tao nhom quyen"

    })
}
module.exports.createPost = async (req,res) => {
    console.log(req.body);
    const data = new Role(req.body);
    await data.save();
    const backUrl = req.get("Referer");
    res.redirect(backUrl);    

}
module.exports.permission  = async (req,res) => {
    let find ={
        deleted: "false"
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/permission.pug",{
        pageTitle : "Phan quyen",
        records : records
    })
}
module.exports.permissionPatch  = async (req,res) => {
//    console.log(req.body);
   const permissions = JSON.parse(req.body.permissions);
   console.log(permissions);
    for(item of permissions){
        const id = item.id
        await Role.updateOne({ _id: id }, { permissions: item.permissions })
    }
    const backUrl = req.get("Referer");
    res.redirect(backUrl);  
}