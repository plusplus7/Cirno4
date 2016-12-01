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

var get_cache = function(key) {
    return cache_source.get(key);
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

var get_article_by_article_id = function (article_id) {
    var article = cache_source.get('article/' + article_id);
    if (article) {
        return article;
    }
};

module.exports.cache = get_cache_source;
module.exports.get_cache = get_cache;
module.exports.get_prev_list_by_category_id = get_prev_list_by_category_id;
module.exports.get_article_by_article_id = get_article_by_article_id;
