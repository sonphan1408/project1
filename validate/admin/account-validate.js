module.exports.createPost = (req,res,next) => {
    if(req.body.email ==""){
        req.flash("error"," Vui long! Nhập email");
        const backUrl = req.get("Referer") 
        res.redirect(backUrl);
    return;
    }
    if(req.body.fullName ==""){
        req.flash("error"," Vui long! Nhap ten");
        const backUrl = req.get("Referer");
        res.redirect(backUrl);
    return;
    }
    if(req.body.password ==""){
        req.flash("error"," Vui long! Nhap mat khau");
        const backUrl = req.get("Referer") 
        res.redirect(backUrl);
    return;
    }
    if(req.body.role_id ==""){
        req.flash("error"," Vui long! Phan quyen");
        const backUrl = req.get("Referer") 
        res.redirect(backUrl);
    return;
    }
    next();
}
module.exports.editPatch = (req,res,next) => {
    if(req.body.email ==""){
        req.flash("error"," Vui long! Nhập email");
        const backUrl = req.get("Referer") 
        res.redirect(backUrl);
    return;
    }
    if(req.body.fullName ==""){
        req.flash("error"," Vui long! Nhap ten");
        const backUrl = req.get("Referer");
        res.redirect(backUrl);
    return;
    }
  
    
    if(req.body.role_id ==""){
        req.flash("error"," Vui long! Phan quyen");
        const backUrl = req.get("Referer") 
        res.redirect(backUrl);
    return;
    }
    next();
}