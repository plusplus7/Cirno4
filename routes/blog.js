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

var blog_area_func = function(category_id, sector_id, req, res, next) {
    res.render('blog_index', {
        prev_list : get_prev_list_by_category_id(category_id),
        top_list : get_top_list_by_sector_id(sector_id),
        side_list : get_side_list_by_sector_id(sector_id),
        area_list : get_area_list_by_sector_id(sector_id)
    });
};

var blog_post_func = function(article_id, sector_id, req, res, next) {

    console.log(res);
    res.render('blog_post', {
        article: get_article_by_article_id(article_id),
        top_list : get_top_list_by_sector_id(sector_id),
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