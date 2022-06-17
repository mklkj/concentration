const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign up' });
});

router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Congratulations!' });
});

module.exports = router;
