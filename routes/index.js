var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json('Thong bao chung');
});

module.exports = router;
