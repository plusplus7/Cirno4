var fileStreamRotator = require('file-stream-rotator')
var fs = require('fs')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var blog = require('./routes/blog');
var api = require('./routes/apis/api');
var admin = require('./routes/admin');
var tasks = require('./services/tasks/data_loader');

tasks.launch();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'cirno4-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('short', {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use(['/nimda'], admin);
app.use(['/blog', '/game'], blog);
app.use(['/'], blog);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
