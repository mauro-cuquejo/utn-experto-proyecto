var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

require('dotenv').config();

var fileUpload = require('express-fileupload');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/admin/usuarios');

let loginRouter = require('./routes/admin/login');
let publicacionesRouter = require('./routes/admin/publicaciones');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(cors());


app.use('/', indexRouter);
app.use('/admin/usuarios', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/publicaciones', publicacionesRouter);
app.use('/api', apiRouter);

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
