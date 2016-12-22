/**
 * Created by plusplus7 on 2016/11/20.
 */

var config = require('config');
var database = require('./database');
const NodeCache = require('node-cache');

// init db engine
var db_source;
var get_database_souce  = function() {

    if (db_source) {
        return db_source;
    }
    db_source = database.create_data_source(
        config.get("Customer.dbConfig.type"),
        config.get("Customer.dbConfig.params")
    );
    return db_source;
};

module.exports.db = get_database_souce;

// init cache engine
var cache_source;

var get_cache_source = function() {
    if (cache_source) {
        return cache_source;
    }
    cache_source = new NodeCache();
    return cache_source;
};

var get_cache = function(key, callback) {
    if (!callback) {
        return cache_source.get(key);
    } else {
        return cache_source.get(key, callback);
    }
};

var get_prev_list_by_category_id = function(category_id) {
    var prev_list = [];
    var category = cache_source.get('category/' + category_id);
    if (category) {
        for (var i=0; i<category.article_list.length; i++) {
            var article = cache_source.get('article/' + category.article_list[i]);
            if (article) {
                prev_list.push(article.preview);
            }
        }
    }
    return prev_list;
};

var get_article_by_article_id = function (article_id, response_callback) {
    return cache_source.get('article/' + article_id, response_callback);
};

var get_category_by_article_id = function (category_id, response_callback) {
    return cache_source.get("category/" + category_id, response_callback);
};

var get_all_category_list = function () {
    var result = [];
    result = result.concat(get_cache("top_list"), get_cache("side_list"), get_cache("area_list"));
    return result;
};

var get_top_list_by_sector_id = function (sector_id) {
    var result = [];
    var list = get_cache('top_list');
    for (var i = 0; i < list.length; i++) {
        if (list[i].sector_id == sector_id) {
            result.push(list[i]);
        }
    }
    return result;
};

var get_side_list_by_sector_id = function (sector_id) {
    var result = [];
    var list = get_cache('side_list');
    for (var i = 0; i < list.length; i++) {
        if (list[i].sector_id == sector_id) {
            result.push(list[i]);
        }
    }
    return result;
};

var get_area_list_by_sector_id = function (sector_id) {
    var result = [];
    var list = get_cache('area_list');
    for (var i = 0; i < list.length; i++) {
        if (list[i].sector_id == sector_id) {
            result.push(list[i]);
        }
    }
    return result;
};

module.exports.cache = get_cache_source;
module.exports.get_cache = get_cache;
module.exports.get_all_category_list        = get_all_category_list;
module.exports.get_top_list_by_sector_id    = get_top_list_by_sector_id;
module.exports.get_side_list_by_sector_id   = get_side_list_by_sector_id;
module.exports.get_area_list_by_sector_id   = get_area_list_by_sector_id;
module.exports.get_prev_list_by_category_id = get_prev_list_by_category_id;
module.exports.get_article_by_article_id    = get_article_by_article_id;
module.exports.get_category_by_article_id   = get_category_by_article_id;
