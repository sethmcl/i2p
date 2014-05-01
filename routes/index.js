var express = require('express');
var router = express.Router();
var puzzle = require('../lib/puzzle');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET puzzle page. */
router.get('/puzzle/:id', function(req, res) {
  puzzle.get(req.params.id).then(function (p) {
    res.render('puzzle', { puzzle: p });
  }, function (err) {
    res.send(err);
    res.status(404);
  });
});

/* POST puzzle page. */
router.post('/puzzle/:id/submit', function(req, res) {
  puzzle.get(req.params.id).then(function (p) {
    res.send(p.submit(req.body.code));
  }, function (err) {
    res.send(err);
    res.status(404);
  });
});

module.exports = router;
