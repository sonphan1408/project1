module.exports.createPost = (req,res,next) => {
    if(req.body.title ==""){
        req.flash("error"," Vui long! Nhap tieu de");
        const backUrl = req.get("Referer") || "/admin/products"; 
        res.redirect(backUrl);
    return;
    }
    next();
}