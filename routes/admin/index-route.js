const { prefixAdmin } = require("../../config/system");
const dashboardRoutes = require("./dashboard-route");
const productRoute = require("./products-route");
const productCategoryRoute = require("./products-category-route");
const roleRoute = require("./role-route");
const accountRoute = require("./account-route");
const authRoute = require("./auth-route");
const authMiddleware = require("../../middleware/admin/auth-middleware")
module.exports = (app) => {
    app.use(prefixAdmin + "/auth",authRoute)
    app.use("/admin/dashboard",authMiddleware.requireAuth,
        dashboardRoutes);
    app.use(prefixAdmin + "/products",authMiddleware.requireAuth,
        productRoute);
    app.use(prefixAdmin + "/products-category",authMiddleware.requireAuth,
        productCategoryRoute);
    app.use(prefixAdmin + "/roles",authMiddleware.requireAuth,
        roleRoute);
    app.use(prefixAdmin + "/accounts",authMiddleware.requireAuth,
        accountRoute);

}
