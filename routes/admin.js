/**
 * Created by plusplus7 on 2016/12/4.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin', {
    });
});

module.exports = router;