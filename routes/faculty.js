const express = require('express');
const router = express.Router();

// ---------------------------
// ---------/faculty----------
// ---------------------------
router.get('/', function (req, res, next) {
    res.json('Trang faculty');
});

module.exports = router;