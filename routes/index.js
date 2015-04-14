var express = require('express');
var router = express.Router();
var path = require('path');

console.log(path.join(__dirname, '..', 'config.json'));
// var channels = require(path.join(__dirname, '..', 'config.json').channels);
var channels = require('/Users/jamil/Developer/socketsub/config.json').channels;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { channels: channels, title: 'Socket Sub Example' });
});

module.exports = router;
