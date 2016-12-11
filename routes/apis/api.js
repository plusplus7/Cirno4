/**
 * Created by plusplus7 on 2016/11/20.
 */

var express = require('express');
var router = express.Router();

var services = require('../../services/services');
var api_utils = require('./utils');
var codes = api_utils.codes;

var db = services.db();
var get_cache = services.get_cache;

router.post('/ListCategories', function (req, res, next) {
    var result = [];
    result = result.concat(get_cache("top_list"), get_cache("side_list"), get_cache("area_list"));
    res.send({
        success : true,
        data : result,
        msg : ""
    });
});

router.post('/GetArticle', function(req, res, next) {
    var article_id  = req.query.article_id;
    get_cache(article_id, function(err, value) {
        var response;
        if (!err) {
            if (value == undefined) {
                response = api_utils.error(codes.no_such_entity, "GetArticle");
            } else {
                response = api_utils.success(value);
            }
        } else {
            response = api_utils.error(codes.internal_error, err);
        }
        res.send(response);
    });
});

router.post('/CreateArticle', function(req, res, next) {
    var article_id  = req.body.article_id;
    var preview     = req.body.preview;
    var content     = req.body.content;
    db.create_article(article_id, preview, content, function (err, result) {
        var response;
        if (!err) {
            if (result.affectedRows != 1) {
                response = api_utils.error(codes.operation_fail, "CreateArticle");
            } else {
                response = api_utils.success();
            }
        } else {
            response = api_utils.error(codes.internal_error, err);
        }
        res.send(response);
    });
});

router.post('/UpdateArticle', function(req, res, next) {
    var article_id  = req.body.article_id;
    var preview     = req.body.preview;
    var content     = req.body.content;
    var view_count  = req.body.view_count;
    db.update_article(article_id, preview, content, view_count, function (err, result) {
        var response;
        if (!err) {
            if (result.affectedRows != 1) {
                response = api_utils.error(codes.operation_fail, "UpdateArticle");
            } else {
                response = api_utils.success();
            }
        } else {
            response = api_utils.error(codes.internal_error, err);
        }
        res.send(response);
    });
});

router.post('/DeleteArticle', function(req, res, next) {
    var article_id  = req.body.article_id;
    db.delete_article(article_id, function (err, result) {
        var response;
        if (!err) {
            if (result.affectedRows != 1) {
                response = api_utils.error(codes.operation_fail, "DeleteArticle");
            } else {
                response = api_utils.success();
            }
        } else {
            response = api_utils.error(codes.internal_error, err);
        }
        res.send(response);
    });
});

module.exports = router;
