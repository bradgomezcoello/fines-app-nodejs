const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

// Initiliazations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Midlewares

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// Global Variables

// Routes

app.use(require('./routes/index'));

// Static Files

app.use(express.static(path.join(__dirname, 'public')));

// Server

app.listen(app.get('port'), () => {
    console.log('Server running on port ', app.get('port'));
});