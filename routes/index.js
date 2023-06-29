const express = require('express');
const router = express.Router();

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Mini Message App', messages: messages });
});

router.get('/new', (req, res) => {
  res.render('form', { title: 'Mini Message App' });
});

router.post('/new', (req, res) => {
  const reqBody = req.body;
  messages.push({
    text: reqBody.userMessage,
    user: reqBody.userName,
    added: new Date(),
  });
  res.redirect('/');
});

module.exports = router;
