/**
 * Created by plusplus7 on 2016/11/19.
 */

var mysql = require('mysql');

function create_data_source(type, params) {
    if (type.toUpperCase() === "MYSQLDB") {
        return MySQLDBSource.create(params);
    }
};

var MySQLDBSource = {
    create : function(params) {
        var connection_info = {
            host        : params.host,
            port        : params.port,
            user        : params.username,
            password    : params.password,
            database    : params.database
        };
        this.conn = mysql.createConnection(connection_info);
        this.conn.connect();
        return this;
    },
    create_article : function(article_id, preview, content, result_callback) {
        var sql = "INSERT INTO article(article_id, preview, content) VALUES(?, ?, ?)";
        this.conn.query(sql,
            [article_id, preview, content],
            result_callback
        );
    },
    update_article : function(article_id, preview, content, view_count, result_callback) {
        var sql = "UPDATE article SET ";
        var params = [];

        if (preview && preview.length > 0) {
            sql = sql + " preview = ?,";
            params.push(preview);
        }
        if (content && content.length > 0) {
            sql = sql + " content = ?,";
            params.push(content);
        }
        if (view_count) {
            sql = sql + " view_count = ?,";
            params.push(view_count);
        }
        if (sql.charAt(sql.length-1) == ',') {
            sql = sql.slice(0, -1);
        }
        sql = sql + " WHERE article_id = ?";
        params.push(article_id);

        this.conn.query(sql,
            params,
            result_callback
        );
    },
    query_article : function(article_id, result_callback) {
        var sql = "SELECT * FROM article WHERE article_id = ?";
        this.conn.query(sql,
            [article_id],
            result_callback
        );
    },
    delete_article : function (article_id, result_callback) {
        var sql = "DELETE FROM article WHERE article_id = ? LIMIT 1";
        this.conn.query(sql,
            [article_id],
            result_callback
        );
    },
    create_category : function(category_id, display_name, sector_id, category_type, article_list, result_callback) {
        var sql = "INSERT INTO category(category_id, display_name, sector_id, category_type, article_list)" +
            " VALUES(?, ?, ?, ?, ?)";
        console.log(sql);
        this.conn.query(sql,
            [category_id, display_name, sector_id, category_type, article_list],
            result_callback
        );
    },
    update_category : function(category_id, display_name, sector_id, category_type, article_list, result_callback) {
        var sql = "UPDATE category SET ";
        var params = [];

        if (display_name && display_name.length > 0) {
            sql = sql + " display_name = ?,";
            params.push(display_name);
        }
        if (sector_id && sector_id.length > 0) {
            sql = sql + " sector_id = ?,";
            params.push(sector_id);
        }
        if (category_type && category_type.length > 0) {
            sql = sql + " category_type = ?,";
            params.push(category_type);
        }
        if (article_list && article_list.length > 0) {
            sql = sql + " article_list = ?,";
            params.push(article_list);
        }
        if (sql.charAt(sql.length-1) == ',') {
            sql = sql.slice(0, -1);
        }
        sql = sql + " WHERE category_id = ?";
        params.push(category_id);

        this.conn.query(sql,
            params,
            result_callback
        );
    },
    query_category : function (category_id, result_callback) {
        var sql = "SELECT * FROM category WHERE category_id = ?";
        this.conn.query(sql,
            [category_id],
            result_callback
        );
    },
    delete_category : function (category_id, result_callback) {
        var sql = "DELETE FROM category WHERE category_id = ? LIMIT 1";
        this.conn.query(sql,
            [category_id],
            result_callback
        );
    }
};

module.exports.create_data_source = create_data_source;