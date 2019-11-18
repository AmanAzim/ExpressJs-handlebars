const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const app = express();

app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'handlebars'}));// Need to register non builtin engines unlike "pug"
app.set('view engine', 'handlebars');//"set" allows us to set any blobal value in our app. can be key-value.//Use "pug" as view creating engine
app.set('views', path.join(__dirname, "views"));// Find the views from "views" directory.

const rootDir = require('./util/path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//parses the raw request body sent through <form>
app.use(bodyParser.urlencoded({extended: false}));

//Serves static files such as css files// grant read access to static files// With this user can access the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);//only url with '/admin' will be handled by this route file

app.use(shopRoutes);

app.use((req, res, next) => {//It will handle all unknown routes
    res.status(404).render('404', { docTitle: 'Page Not Found'});
});


app.listen(3000);