var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('event', { title: 'Express' });
});

router.get('/insertMember', function(req, res, next) {
  res.render('insertMember', { title: 'Express' });
});

module.exports = router;
