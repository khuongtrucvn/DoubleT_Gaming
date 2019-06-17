var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const User = require('./models/nguoidung');

passport.use(new LocalStrategy(
    async function(username, password, done) {
      try {
        const user = await User.findOne({where:{username:username}});
        console.log(user);
        if (!user) {
          return done(null, false, {message: 'Sai tên tài khoản'});
        }
        const findUser = await User.findOne({where:{username:username}});
        if (findUser.password != password) {
          return done(null, false, {message: 'Sai mật khẩu'});
        }
        return done(null, user);
      } catch (ex) {
        return done(ex);
      }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    const user = await await User.findOne({where:{id:id}});
    done(undefined, user);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());

const trangchuRouter = require('./routes/trang-chu');
const sanphamRouter = require('./routes/san-pham');
const theloaiRouter = require('./routes/the-loai');
const nhaphathanhRouter = require('./routes/nha-phat-hanh');
const donhangRouter = require('./routes/don-hang');
const nguoidungRouter = require('./routes/nguoi-dung');
const giohangRouter = require('./routes/gio-hang');

app.use('/', trangchuRouter);
app.use('/san-pham', sanphamRouter);
app.use('/the-loai', theloaiRouter);
app.use('/nha-phat-hanh',nhaphathanhRouter);
app.use('/don-hang',donhangRouter);
app.use('/nguoi-dung',nguoidungRouter);
app.use('/gio-hang',giohangRouter);

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
