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

module.exports.cache = get_cache_source;
