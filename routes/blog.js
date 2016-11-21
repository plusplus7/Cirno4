/**
 * Created by plusplus7 on 2016/11/20.
 */

var express = require('express');
var config = require('config');
var router = express.Router();

var services = require("../services/services");
var db = services.db();

/* GET home page. */

var blog_area_func = function(sector_id, category_id, req, res, next) {
    db.query_article("test1", function (err, result) {
        console.log(err);
        console.log(result);
    });
    res.render('index', {
        title: 'Express',
        config: config
    });
};

router.get('/', function(req, res, next) {
    return blog_area_func(req.originalUrl.substr(1), "index", req, res, next);
});

module.exports = router;