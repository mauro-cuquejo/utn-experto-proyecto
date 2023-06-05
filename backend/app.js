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
  saveUninitialized: true,
};

app.use(session(datosSesion));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

//app.use(cors({origin: 'http://localhost:3001', credentials: true}));

let secured = (req, res, next) => {
  try {
    console.log(req.session)
    console.log("id usuario: " + req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      throw new Error("Usuario deslogueado");
    }
  } catch (error) {
    res.status(422);
    res.json({
      error: true,
      message: error.message
    });
  }
}

app.use('/', cors({ origin: 'http://localhost:3001', credentials: true }), indexRouter);
app.use('/admin/usuarios', cors({ origin: 'http://localhost:3001', credentials: true }), usersRouter);
app.use('/admin/login', cors({ origin: 'http://localhost:3001', credentials: true }), loginRouter);
app.use('/admin/publicaciones', cors({ origin: 'http://localhost:3001', credentials: true }), publicacionesRouter);
app.use('/api', cors({ origin: 'http://localhost:3001', credentials: true }), apiRouter);

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
