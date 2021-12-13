const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json('Trang thông báo giảng viên, viên chức');
});

router.get('/post', function (req, res, next) {
    res.json('Trang thông báo giảng viên, viên chức');
});

module.exports = router;