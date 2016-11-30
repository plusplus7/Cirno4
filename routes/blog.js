/**
 * Created by plusplus7 on 2016/11/20.
 */

var express = require('express');
var config = require('config');
var router = express.Router();

var services = require("../services/services");
var db = services.db();
var cache = services.cache();

var get_prev_list_by_category_id = function(cache, category_id) {
    var prev_list = [];
    var category = cache.get('category/' + category_id);
    if (category) {
        for (var i=0; i<category.article_list.length; i++) {
            var article = cache.get('article/' + category.article_list[i]);
            if (article) {
                prev_list.push(article.preview);
            }
        }
    }
    return prev_list;
};

var get_article_by_article_id = function (cache, article_id) {
    var article = cache.get('article/' + article_id);
    if (article) {
        return article;
    }
};

var blog_area_func = function(category_id, req, res, next) {

    res.render('blog_index', {
        prev_list : get_prev_list_by_category_id(cache, category_id),
        top_list : cache.get('top_list'),
        side_list : cache.get('side_list'),
        area_list : cache.get('area_list')
    });
};

var blog_post_func = function(article_id, req, res, next) {

    res.render('blog_post', {
        article: get_article_by_article_id(cache, article_id),
        top_list : cache.get('top_list')
    });
};

router.get('/', function(req, res, next) {
    if (req.baseUrl.startsWith("/game")) {
        return blog_area_func("gameindex", req, res, next);
    } else {
        return blog_area_func("index", req, res, next);
    }
});

router.get('/area/:category_id', function(req, res, next) {
    return blog_area_func(req.params.category_id, req, res, next);
});

router.get('/post/:article_id', function(req, res, next) {
    return blog_post_func(req.params.article_id, req, res, next);
});

router.get('/:article_id', function(req, res, next) {
    return blog_post_func(req.params.article_id, req, res, next);
});

module.exports = router;