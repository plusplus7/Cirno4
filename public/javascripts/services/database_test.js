/**
 * Created by plusplus7 on 2016/11/19.
 */

var db = require("./database");
var assert = require("assert");

d = db.create_data_source("MysqlDB", {
    host : "127.0.0.1",
    port : "3306",
    username : "root",
    password : "root",
    database : "cirno_test"
});

var article_example = "test2_preview<>!$@!#$%  R!!FDAS VZC<)" +
    "\n\t\n\t\r\n\t1424hfdjksl<>!$!@#!@%^&**((&^%$# F AV  )(" +
    "@!($#@%$#^%&#$TEFDSalsdaknvanslxzcFFFFFFdfasDQE FR\r\n\t";

describe('testQueryArticle', function() {
    it('should return a specified article', function(done) {
        d.query_article("test1", function(err, result) {
            assert.equal(err, null);
            assert.equal(result.length, 1);
            var article = result[0];
            assert.equal(article.article_id, 'test1');
            assert.equal(Date.parse(article.create_time), Date.parse("Sat Nov 19 2016 18:58:10 GMT+0800 (CST)"));
            assert.equal(article.view_count, 0);
            assert.equal(article.preview.toString(), 'test_preview');
            assert.equal(article.content.toString(), 'test_content');
            console.log("  Done"); done();
        });
    });
    it('should return error', function(done) {
        d.query_article("test_not_exist", function(err, result) {
            assert.equal(err, null);
            assert.equal(result.length, 0);
            console.log("  Done"); done();
        });
    });
});

describe('testCreateArticle', function() {

    it('should return the number of article created', function(done) {
        d.create_article("test2", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);

            d.query_article("test2", function(err, result) {
                assert.equal(err, null);
                assert.equal(result.length, 1);
                var article = result[0];
                assert.equal(article.article_id, 'test2');
                assert.equal(article.view_count, 0);
                assert.equal(article.preview.toString(), article_example);
                assert.equal(article.content.toString(), article_example);

                d.delete_article("test2", function (err, result) {
                    assert.equal(err, null);
                    assert.equal(result.affectedRows, 1);
                    console.log("  Done"); done();
                });
            });
        });
    });
});

describe('testUpdateArticle', function() {
    it('should update preview and return the number of article updated', function(done) {
        d.create_article("test2", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);
            d.update_article("test2", 'preview updated!', null, 2333, function(err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);
                d.query_article("test2", function(err, result) {
                    assert.equal(err, null);
                    console.log(result);
                    assert.equal(result.length, 1);
                    var article = result[0];
                    assert.equal(article.article_id, 'test2');
                    assert.equal(article.view_count, 2333);
                    assert.equal(article.preview.toString(), "preview updated!");
                    assert.equal(article.content.toString(), article_example);
                    d.delete_article("test2", function (err, result) {
                        assert.equal(err, null);
                        assert.equal(result.affectedRows, 1);
                        console.log("  Done"); done();
                    });
                });
            });
        });
    });

    it('should update content return the number of article updated', function(done) {
        d.create_article("test2", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);
            d.update_article("test2", null, "content updated!", 2333, function(err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);
                d.query_article("test2", function(err, result) {
                    assert.equal(err, null);
                    assert.equal(result.length, 1);
                    var article = result[0];
                    assert.equal(article.article_id, 'test2');
                    assert.equal(article.view_count, 2333);
                    assert.equal(article.preview.toString(), article_example);
                    assert.equal(article.content.toString(), "content updated!");
                    d.delete_article("test2", function (err, result) {
                        assert.equal(err, null);
                        assert.equal(result.affectedRows, 1);
                        console.log("  Done"); done();
                    });
                });
            });
        });
    });

    it('should update view_count return the number of article updated', function(done) {
        d.create_article("test2", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);
            d.update_article("test2", null, null, 31415926, function(err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);
                d.query_article("test2", function(err, result) {
                    assert.equal(err, null);
                    assert.equal(result.length, 1);
                    var article = result[0];
                    assert.equal(article.article_id, 'test2');
                    assert.equal(article.view_count, 31415926);
                    assert.equal(article.preview.toString(), article_example);
                    assert.equal(article.content.toString(), article_example);
                    d.delete_article("test2", function (err, result) {
                        assert.equal(err, null);
                        assert.equal(result.affectedRows, 1);
                        console.log("  Done"); done();
                    });
                });
            });
        });
    });
});

describe('testDeleteArticle', function() {

    it('should return the number of article deleted', function(done) {
        d.create_article("test2", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);

            d.delete_article("test2", function (err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);
                console.log("  Done"); done();
            });
        });
    });
});