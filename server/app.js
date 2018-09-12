require('dotenv').config();

const express = require('express'),
      app = express();

const cors = require('cors'),
      jwt = require('jsonwebtoken'),
      request = require('request');
      bodyParser= require('body-parser');

const indexRouter = require('./routes/index'),
      usersRouter = require('./routes/users'),
      itemsRouter = require('./routes/items'),
      categoriesRouter = require('./routes/categories'),
      transactionsRouter = require('./routes/transactions');

const port = 3000;

//Connecting to Mongoose
const mongoose   = require('mongoose'),
      url = 'mongodb://localhost:27017/e-commerce';

mongoose.connect(url,{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
});

app.listen (port, () => {
  console.log(`Application listening on port: ${port}`);
});

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors());

app
  .use('/api', indexRouter)
  .use('/api/users', usersRouter)
  .use('/api/items', itemsRouter)
  .use('/api/categories', categoriesRouter)
  .use('/api/transactions', transactionsRouter);