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
var get_all_category_list = services.get_all_category_list;

router.post('/ListCategories', function (req, res, next) {
    res.send({
        success : true,
        data : get_all_category_list(),
        msg : ""
    });
});

router.post('/GetCategory', function(req, res, next) {
    var category_id = req.body.category_id;
    if (!category_id) {
        var response = api_utils.error(codes.operation_fail, "InvalidParameter");
        res.send(response);
        return;
    }
    get_cache("category/" + category_id, function (err, value) {
        var response;
        if (!err) {
            if (value == undefined) {
                response = api_utils.error(codes.no_such_entity, "GetCategory");
            } else {
                response = api_utils.success(value);
            }
        } else {
            response = api_utils.error(codes.internal_error, err);
        }
        res.send(response);
        return;
    });
});

router.post('/CreateCategory', function(req, res, next) {
    var category_id     = req.body.category_id;
    var sector_id       = req.body.sector_id;
    var category_type   = req.body.category_type;
    var display_name    = req.body.display_name;
    db.create_category(category_id, display_name, sector_id, category_type, "[]", function (err, result) {
        var response;
        if (!err) {
            if (result.affectedRows != 1) {
                response = api_utils.error(codes.operation_fail, "CreateCategory");
            } else {
                response = api_utils.success();
            }
        } else {
            response = api_utils.error(codes.internal_error, err);
        }
        res.send(response);
    });
});

router.post('/UpdateCategory', function(req, res, next) {
    var category_id     = req.body.category_id;
    var sector_id       = req.body.sector_id;
    var category_type   = req.body.category_type;
    var display_name    = req.body.display_name;
    var article_list    = req.body.article_list;
    try {
        JSON.parse(article_list);
    } catch (e) {
        var response = api_utils.error(codes.operation_fail, "InvalidJsonString");
        res.send(response);
        return;
    }
    db.update_category(category_id, display_name, sector_id, category_type, article_list, function (err, result) {
        var response;
        if (!err) {
            if (result.affectedRows != 1) {
                response = api_utils.error(codes.operation_fail, "UpdateCategory");
            } else {
                response = api_utils.success();
            }
        } else {
            response = api_utils.error(codes.internal_error, err);
        }
        res.send(response);
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
