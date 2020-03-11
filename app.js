var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var aboutRouter = require('./routes/about');
var contactRouter= require('./routes/contact');
var portfolioRouter = require('./routes/portfolio');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mustacheExpress= require('mustache-express');
var app = express();

// view engine setup
app.engine('mustache',mustacheExpress());
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'mustache');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about',aboutRouter);
app.use('/contact',contactRouter);
app.use('/portfolio',portfolioRouter);
app.use('/users', usersRouter);

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
  res.render('index');
});
console.log(process.env.PORT)
const port= process.env.PORT || 5000;
app.listen( port, ()=>{
  console.log(`app is running and listeing on ${port}`)
})

module.exports = app;
