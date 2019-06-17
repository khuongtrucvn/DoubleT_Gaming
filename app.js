var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const trangchuRouter = require('./routes/trang-chu');
const sanphamRouter = require('./routes/san-pham');
const theloaiRouter = require('./routes/the-loai');
const nhaphathanhRouter = require('./routes/nha-phat-hanh');
//const donhangRouter = require('./routes/don-hang');
//const nguoidungRouter = require('./routes/nguoi-dung');

app.use('/', trangchuRouter);
app.use('/san-pham', sanphamRouter);
app.use('/the-loai', theloaiRouter);
app.use('/nha-phat-hanh',nhaphathanhRouter);
//app.use('/don-hang',donhangRouter);
//app.use('/nguoi-dung',nguoidungRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
