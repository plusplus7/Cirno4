/**
 * Created by plusplus7 on 2016/11/20.
 */

var express = require('express');
var config = require('config');
var router = express.Router();

var services = require("../services/services");
var get_prev_list_by_category_id    = services.get_prev_list_by_category_id;
var get_article_by_article_id       = services.get_article_by_article_id;
var get_top_list_by_sector_id   = services.get_top_list_by_sector_id;
var get_area_list_by_sector_id  = services.get_area_list_by_sector_id;
var get_side_list_by_sector_id  = services.get_side_list_by_sector_id;

var no_such_article_alert   = "<script>alert('找不到这样的文章呢! 可能是系统出问题了，请联系管理员jackiedeng.cn at gmail.com! 谢谢!');window.location.href='/';</script>";
var no_such_sector_alert    = "<script>alert('找不到这样的分类呢! 可能是系统出问题了，请联系管理员jackiedeng.cn at gmail.com! 谢谢!');window.location.href='/';</script>";
var system_error_alert      = "<script>alert('系统初始化中。如需要帮助，请联系管理员jackiedeng.cn at gmail.com! 谢谢!');window.location.href='/';</script>";

var blog_area_func = function(category_id, sector_id, req, res, next) {

    var top_list =  get_top_list_by_sector_id(sector_id);
    var side_list = get_side_list_by_sector_id(sector_id);
    var area_list = get_area_list_by_sector_id(sector_id);
    var prev_list = get_prev_list_by_category_id(category_id);

    if (sector_id != "game" && sector_id != "blog") {
        res.send(no_such_sector_alert);
        return ;
    }
    if (prev_list == null || top_list == null || side_list == null || area_list == null) {
        res.send(system_error_alert);
        return ;
    }
    res.render('blog_index', {
        prev_list : prev_list,
        top_list : top_list,
        side_list : side_list,
        area_list : area_list
    });
};

var blog_post_func = function(article_id, sector_id, req, res, next) {

    var article = null;
    var top_list = get_top_list_by_sector_id(sector_id);

    if (sector_id != "game" && sector_id != "blog") {
        res.send(no_such_sector_alert);
        return ;
    }
    get_article_by_article_id(article_id, function(err, value) {
        if (!err && value != undefined) {
            article = value;
        }
    });

    if (article == null) {
        res.send(no_such_article_alert);
        return ;
    }
    if (top_list == null) {
        res.send(system_error_alert);
        return ;
    }
    res.render('blog_post', {
        article: article,
        top_list : top_list
    });
};

router.get('/', function(req, res, next) {
    if (req.baseUrl.startsWith("/game")) {
        return blog_area_func("gameindex", "game", req, res, next);
    } else {
        return blog_area_func("index", "blog", req, res, next);
    }
});

router.get('/:sector_id/area/:category_id', function(req, res, next) {
    return blog_area_func(req.params.category_id, req.params.sector_id, req, res, next);
});

router.get('/:sector_id/post/:article_id', function(req, res, next) {
    return blog_post_func(req.params.article_id, req.params.sector_id, req, res, next);
});

router.get('/:article_id', function(req, res, next) {
    return blog_post_func(req.params.article_id, "blog", req, res, next);
});

module.exports = router;