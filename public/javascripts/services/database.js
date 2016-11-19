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
    create_article : function(article_id, preview, content, result_func) {
        var sql = "INSERT INTO article(article_id, preview, content) VALUES(?, ?, ?)";
        this.conn.query(sql,
            [article_id, preview, content],
            result_func
        );
    },
    update_article : function(article_id, preview, content, view_count, result_func) {
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
        console.log("1");
        console.log(sql.charAt(sql.length-1)===',');
        console.log("1");
        if (sql.charAt(sql.length-1) == ',') {
            sql = sql.slice(0, -1);
            console.log(sql);
        }
        sql = sql + " WHERE article_id = ?";
        params.push(article_id);

        console.log(sql);
        this.conn.query(sql,
            params,
            result_func
        );
    },
    query_article : function(article_id, result_func) {
        var sql = "SELECT * FROM article WHERE article_id = ?";
        this.conn.query(sql,
            [article_id],
            result_func
        );
    },
    delete_article : function (article_id, result_func) {
        var sql = "DELETE FROM article WHERE article_id = ? LIMIT 1";
        this.conn.query(sql,
            [article_id],
            result_func
        );
    }
};

module.exports.create_data_source = create_data_source;