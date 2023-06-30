const express = require('express');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('../models/message');

mongoose
  .connect(process.env.DB_URI)
  .then((x) =>
    console.log(`Connected the Database: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error('Error connecting to mongo', err));

/* GET home page. */
router.get('/', async function (req, res, next) {
  await Message.find().then((docs) => {
    res.render('index', { title: 'Mini Message App', docs: docs });
  });
});

router.get('/new', (req, res) => {
  res.render('form', { title: 'Mini Message App' });
});

router.post('/new', async (req, res) => {
  const reqBody = req.body;
  const message = new Message({
    name: reqBody.userName,
    message: reqBody.userMessage,
    added: new Date(),
  });
  await message.save().then(() => console.log('Message saved'));
  res.redirect('/');
});

module.exports = router;
