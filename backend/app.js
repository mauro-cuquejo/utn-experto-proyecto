var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

require('dotenv').config();

var fileUpload = require('express-fileupload');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/admin/usuarios');

let loginRouter = require('./routes/admin/login');
let publicacionesRouter = require('./routes/admin/publicaciones');
var apiRouter = require('./routes/api');


let secured = (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configuraciones sesion.
let datosSesion = {
  secret: 'aoisdjasoijd12312oij2',
  resave: false,
  saveUninitialized: true
};

app.use(session(datosSesion));

app.use('/', indexRouter);
app.use('/admin/usuarios', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/publicaciones', secured, publicacionesRouter);
app.use('/api', cors(), apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
