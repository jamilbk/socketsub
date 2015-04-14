var express = require('express');
var router = express.Router();
var channels = require('../config.json').channels;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { channels: channels, title: 'Socket Sub Example' });
});

module.exports = router;
