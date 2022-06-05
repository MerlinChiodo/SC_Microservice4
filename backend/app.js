const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require(`cors`);


const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const eventTestRouter = require('./routes/eventTest');
const reportsRouter =  require('./routes/reports');
const usersRouter =  require('./routes/users');
const picturesRouter =  require('./routes/pictures');
const administratorsRouter =  require('./routes/administrators');
const landingPageRouter =  require('./routes/landingPage');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



/*app.get("*", async (req, res) =>{
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})*/


app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/eventTest', eventTestRouter);
app.use('/reports', reportsRouter);
app.use('/users', usersRouter);
app.use('/pictures', picturesRouter);
app.use('/administrators', administratorsRouter);
app.use('/landingPage', landingPageRouter);



app.use(express.static(path.join(__dirname, "../frontend/dist")));

module.exports = app;
