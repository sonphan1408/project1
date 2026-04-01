const Product = require("../../models/product_model");
const filterStatusHp = require("../../helpers/fillterStatus");
const objectSearchHp = require("../../helpers/search")
const productCategory = require("../../models/products-category-model");
const createTreeHp = require("../../helpers/create-tree");
const productsCategory = require("../../models/products-category-model");

module.exports.product = async (req,res) => {
  
    let find = {
        deleted: "false"
    }
    // start find status
    const filterStatus = filterStatusHp(req.query);
     if (req.query.status) {
         find.status = req.query.status;
     }
     // end file status

     // start search
     const objectSearch = objectSearchHp(req.query);
     if(objectSearch.regex){
      find.title = objectSearch.regex;

     }
    //  pagination
    
    const objectPagination = {
        currentPage: 1,
        limitItems: 4
    };
    if(req.query.page){
      objectPagination.currentPage = parseInt(req.query.page);
      
   }
   // end pagination

   // Sort
   let sort = {
    
   }
   if(req.query.sortTitle && req.query.sortKey){
        sort[req.query.sortTitle] = req.query.sortKey;
   }else{
    sort.position = "desc";
   }
   // end Sort
    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
    objectPagination.totalPage = totalPage;
     objectPagination.skip = (objectPagination.currentPage - 1)*objectPagination.limitItems; 
     
    
  
    
     
     const products = await Product.find(find)
     .sort(sort)
     .limit(objectPagination.limitItems)
     .skip(objectPagination.skip);
   
    res.render("admin/pages/products/products.pug", {
        pageTitle:"Trang san pham",
        products : products,
        filterStatus : filterStatus,
         keyword: objectSearch.keyword,
         pagination: objectPagination,
         
    })
}
module.exports.changeStatus = async (req,res) => {
    let id = req.params.id;
    let status = req.params.status;
    await Product.updateOne({_id:id},{status: status});
    req.flash("success","Cập nhật trạng thái thành công");
    // res.redirect('back');
    const backUrl = req.get("Referer") || "/admin/products"; 
  
    res.redirect(backUrl);
    

}
module.exports.changeMulti = async (req,res) => {
    
    
    const ids = req.body.ids.split(",");
    const type = req.body.type;
    console.log(req.body);

    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in :ids}},{status: "active"});
            
            break;
        case "inactive":
            await Product.updateMany({_id: {$in :ids}},{status: "inactive"});
            break;
        case "deleteAll":
            await Product.updateMany({_id: {$in :ids}},{
                deleted: true,
                deletedAt: new Date()
            });
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                console.log(id);
               
                await Product.updateOne({ _id: id }, { position: position });
            }
           
            break;
        default:
            break;
    }
   
   
    
    const backUrl = req.get("Referer") || "/admin/products"; 
  
    res.redirect(backUrl);
    

}
module.exports.deleteItem = async (req,res) => {
    let id = req.params.id;
   
    await Product.updateOne({_id:id},{
        deleted : true,
        deletedBy:{
            account_id: res.locals.user.id,
            deletedAt: new Date()
        }
    });
    // res.redirect('back');
    const backUrl = req.get("Referer") || "/admin/products"; 
  
    res.redirect(backUrl);
    

}
module.exports.create = async (req,res) => {
     
    //category
    let find1 = {
        deleted: "false"
    }

   const records = await productCategory.find(find1);
   const newRecords = createTreeHp.createT(records);
 
    // end category
    res.render("admin/pages/products/create.pug",{
        pageTitle:"Them moi san pham",
        records: newRecords

    });
} 
module.exports.createPost = async (req,res) => {
    console.log(req.body);
    
    req.body.price = parseFloat(req.body.price);
    req.body.createdBy = {
        account_id: res.locals.user.id
    }
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseFloat(req.body.stock);
    if(req.body.position == ""){
        const count = await Product.countDocuments();
        req.body.position = count + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    
    // if(req.file){
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }
    const products = new Product(req.body);
    await products.save();  
// 
   res.redirect("/admin/products");
    
} 
module.exports.edit = async (req,res) => {
   
    let id = req.params.id;
    let find = {
        deleted: "false",
        _id: id
    };
    const result  = await Product.findOne(find);
     const records = await productsCategory.find({
        deleted: false
     });
    const newRecords = createTreeHp.createT(records);
    // console.log(newRecords);
    // console.log(result);
    res.render("admin/pages/products/edit.pug",{
        pageTitle: "Trang thay đổi sản phẩm",
        product: result,
        records: newRecords
    });
}
module.exports.editPatch = async (req,res) => {
try {
    console.log(req.body.category_id);
    const id = req.params.id;
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseFloat(req.body.stock);
    if(req.body.position == ""){
        const count = await Product.countDocuments();
        req.body.position = count + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    // if(req.file){
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }
    await Product.updateOne({_id:id},req.body);
   
    req.flash("success","Cập nhật thành công")

    const backUrl = req.get("Referer") || "/admin/products"; 
  
    res.redirect(backUrl);
} catch (error) {
    console.error("Dòng lỗi cụ thể:", error);
   
    
    req.flash("error","Xảy ra lổi");
    const backUrl = req.get("Referer") || "/admin/products"; 
  
    res.redirect(backUrl);
}

   

  
}