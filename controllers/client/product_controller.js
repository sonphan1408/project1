const Product = require("../../models/product_model");
const productsCategory = require("../../models/products-category-model")

module.exports.index =  async(req,res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
   })
//     console.log(products);
   
//     function getCategories(categories,categoryParent_id){
//         let listIds =[categoryParent_id];
//         for(const category of categories){
//             if(category.parent_id == categoryParent_id){
//                 const categoryChilren = getCategories(categories,category.id);
//                 listIds = listIds.concat(categoryChilren);
//             }
//         }
//         return listIds;
//     }
//    const productCategories = await productsCategory.find({
//         deleted: false

//    })




   
   function getCategories(productCategories,category_id){
        let listIdCategories = [category_id];
        productCategories.forEach(category =>{
            if(category.parent_id == category_id){
                const categoriesChilren = getCategories(productCategories,category.id);
                if(categoriesChilren){
                    listIdCategories = listIdCategories.concat(categoriesChilren);
                }
                
            }
        })
        return listIdCategories

   }
      const productCategories = await productsCategory.find({
        deleted: false

   })


//  

async function  treeCategory(productCategories,parent_id = ""){
    let list = [];
    if(parent_id != ""){
        for (const category of productCategories) {
            if(category.id == parent_id){
                products = await Product.find({
                    deleted: false,
                    status: "active",
                    category_id: category.id
                })
                list = list.concat(products);
                const children = await treeCategory(productCategories,category.id);
                if(children){
                    list = list.concat(children);        

                }
                    
            }
        }
    }else{
        for (const category of productCategories) {
            if(category.parent_id == parent_id){
                const children = await treeCategory(productCategories,category.id);
                if(children){
                    list = list.concat(children);        

                }
            }
        }



    }

    return list
}








   const listIdCategories = getCategories(productCategories,"6981e693ce0c9ed054b1e361") 
   
   const finalProducts = await Product.find({
    deleted:false,
    status: "active",
    category_id: {$in:listIdCategories}
   })
 
 console.log(finalProducts);

   products.forEach(item => {
    item.newPrice = item.price*item.discountPercentage/100;
   })
    res.render("client/pages/products/products",{
        titlePage : "Trang chu",
        products: products
    });
}

