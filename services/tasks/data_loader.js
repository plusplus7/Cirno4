/**
 * Created by plusplus7 on 2016/11/21.
 */

var timer = require('timers');
var services = require('../services');

var set_cache_callback = function(err, success) {
    if (err || !success) {
       console.log("Set cache failed! " + err + " " + success);
    }
};

var load_article_callback = function(cache) {
    return function(err, result) {
        if (err == null) {
            for (var i in result) {
                var data = result[i];
                data.preview = data.preview.toString('utf8');
                data.content = data.content.toString('utf8');
                cache.set(data.article_id, data, set_cache_callback);
            }
        }
    };
};

var load_category_callback = function(cache) {
    return function(err, result) {
        if (err == null) {
            for (var i in result) {
                var data = result[i];
                data.article_list = JSON.parse(data.article_list);
                cache.set(data.category_id, data, set_cache_callback);
            }
        }
    };
};

var load_data = function(db, cache) {
    db.query_all_articles(load_article_callback(cache));
    db.query_all_categories(load_category_callback(cache));
};

var interval_id;
var launch_tasks = function() {
    if (interval_id) {
        return ;
    }
    var db = services.db();
    var cache = services.cache();
    interval_id = setInterval(load_data, 1 * 1000, db, cache);
};

var shutdown_tasks = function () {
    if (interval_id) {
        clearInterval(interval_id);
    }
};

module.exports.launch   = launch_tasks;
module.exports.shutdown = shutdown_tasks;