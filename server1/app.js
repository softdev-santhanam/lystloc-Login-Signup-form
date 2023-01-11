const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

var app = express();
app.set('view engine','ejs')

app.use(cookieParser());

app.get('/form', csrfProtection, function (req, res) {
// pass the csrfToken to the view
res.render('login', { csrfToken: req.csrfToken() });
});

app.post('/process', parseForm,
	csrfProtection, function (req, res) {
res.send('Successfully Validated!!');
});

app.listen(5000, (err) => {
if (err) console.log(err);
console.log('Server Running at the port 5000');
});
