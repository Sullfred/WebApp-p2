var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var studentRouter = require('./routes/student');
var teacherRouter = require('./routes/teacher');
var homeworkRouter = require('./routes/homework');
var progressRouter = require('./routes/progress');
var exercisesRouter = require('./routes/exercises');
var homeworkCreatorRouter = require('./routes/homeworkCreator');
var classRouter = require('./routes/class');
var assignmentlibraryRouter = require('./routes/assignmentlibrary');
var infoRouter = require('./routes/info');

var app = express();

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
}));

app.use(cookieParser())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/homework', homeworkRouter);
app.use('/progress', progressRouter);
app.use('/exercises', exercisesRouter);
app.use('/homeworkCreator', homeworkCreatorRouter);
app.use('/class', classRouter);
app.use('/assignmentlibrary', assignmentlibraryRouter);
app.use('/info', infoRouter);



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
