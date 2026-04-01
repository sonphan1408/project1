const express = require("express");
const route = require("./routes/client/indexrt");
const mongoose = require("../Problem/config/mongoose_config");
const routeAdmin = require("./routes/admin/index-route");
const methodOverride = require('method-override')
const flash = require('express-flash');
const port = process.env.PORT;
const app = express();
const bodyParser = require('body-parser');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path'); 

app.set("views",`${__dirname}/views`);
app.set("view engine", "pug");
const systemConfig = require("./config/system");
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Lưu biến prefixAdmin vào app.locals để dùng ở mọi file Pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;
mongoose.connect();
app.use(methodOverride('_method'));
route(app);
routeAdmin(app);    
app.use(express.static(`${__dirname}/public`));

app.listen(port,() =>
{
    console.log(`Listen to port: ${port}`);
});