const productsCategory = require("../../models/products-category-model");
const createTree = require("../../helpers/create-tree")
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await productsCategory.find(find);
    // const records = await productsCategory.find(find);
    const newRecords = createTree.createT(records);
    res.render("admin/pages/products-category/products-category.pug", {
        records: newRecords


    })
}
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await productsCategory.find(find);

   
    const newRecords = createTree.createT(records);
    // console.log(newRecords);
    // for (item of newRecords){
    //     console.log(item);
    //     if(item.children){
    //         console.log(item.children);
    //     }
    // }


    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Them moi san pham",
        records: newRecords

    });



}
module.exports.createPost = async (req, res) => {
    try {
        console.log(req.body);  
        if (req.body.position == "") {
            let count = await productsCategory.countDocuments();
            req.body.position = count + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
       
        const records = new productsCategory(req.body);
        await records.save();
        req.flash("success","Tao thanh cong");
        const backUrl = req.get("Referer")
      
        res.redirect(backUrl);
    } catch (error) {
        console.log(errpo);
        req.flash("error","Tao moi that bai")
        
    }
    

}
