const path = require('path');
const express = require('express');
const passport = require('passport')
const session = require('express-session')
const Handlebars = require('handlebars')
const methodOverride = require('method-override')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars');
const authRouter = require('./router/auth')
const indexRouter = require('./router/index') 
const storieRouter = require('./router/stories')
const { truncate, stripTags,dateFormat,select,compare } = require('./helper/hbs');

require('./config/mongodb')
const app = express();
const port = process.env.PORT;

//handlebars configration 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.engine('handlebars', exphbs({
    helpers: {
        stripTags,
        truncate,
        dateFormat,
        select,
        compare
        
    }, handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
// method override middleware 
app.use(methodOverride('_method'))
// // static file middleware
const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))
// express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
// passport middlewareg
app.use(passport.initialize());
app.use(passport.session());

//golobal varables 
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next()
})

// routes
app.use(indexRouter);
app.use(authRouter);
app.use(storieRouter)

app.listen(port, () => {
    console.log(`sever is running on port ${port}`);
})