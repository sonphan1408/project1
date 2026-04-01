const product_controller = require("../../controllers/client/product_controller");

module.exports = (app) => {
    app.get("/",product_controller.index);
    app.get("/products",(req,res) => 
    {
        
    })
}