/**
 * Created by plusplus7 on 2016/11/20.
 */

var express = require('express');
var router = express.Router();

var services = require('../../services/services');
var api_utils = require('./utils');

var db = services.db();
var cache = services.cache();

router.get('/GetArticle', function(req, res, next) {
    var article_id = req.param("article_id");
    cache.get(article_id, function(err, value) {
        var response;
        if (!err) {
            if (value == undefined) {
                response = api_utils.error(codes.no_such_entity, "Article");
            } else {
                response = api_utils.success(value);
            }
        } else {
            response = api_utils.error(codes.internal_error, err);
        }
        res.send(response);
    });
});

router.get('/CreateArticle', function(req, res, next) {
    var article_id  = req.param("article_id");
    var preview     = req.param("preview");
    var content     = req.param("content");
    db.create_article(article_id, preview, content, function (err, result) {
        var response;
        if (!err) {
            if (result.affectedRows != 1) {
                response = api_utils.error(codes.operation_failed, "InsertArticle");
            } else {
                response = api_utils.success("{}");
            }
        } else {
            response = api_utils.error(codes.internal_error, err);
        }
        res.send(response);
    });
});

module.exports = router;
