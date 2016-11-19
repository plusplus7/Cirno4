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

var article_example = "test2_preview<>!$@!#$%lvanl<!>@>!>$@$>!@>>  R!!FDAS VZC<)" +
    "\n\t\n\t\r\n\t1424hfdjksl<!$!@14看了解了福利大家#!@%锟斤拷^&**((&^%$# F AV  )(" +
    "@!($#@%$#^%&#$TEFDSalsdaknvanslxzcF烫烫烫，屯屯屯，锘锘锘FFFFFdfasDQE FR\r\n\t";

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
        d.create_article("test2_article", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);

            d.query_article("test2_article", function(err, result) {
                assert.equal(err, null);
                assert.equal(result.length, 1);
                var article = result[0];
                assert.equal(article.article_id, "test2_article");
                assert.equal(article.view_count, 0);
                assert.equal(article.preview.toString(), article_example);
                assert.equal(article.content.toString(), article_example);

                d.delete_article("test2_article", function (err, result) {
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
        d.create_article("test2_article", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);
            d.update_article("test2_article", 'preview updated!', null, 2333, function(err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);
                d.query_article("test2_article", function(err, result) {
                    assert.equal(err, null);
                    console.log(result);
                    assert.equal(result.length, 1);
                    var article = result[0];
                    assert.equal(article.article_id, "test2_article");
                    assert.equal(article.view_count, 2333);
                    assert.equal(article.preview.toString(), "preview updated!");
                    assert.equal(article.content.toString(), article_example);
                    d.delete_article("test2_article", function (err, result) {
                        assert.equal(err, null);
                        assert.equal(result.affectedRows, 1);
                        console.log("  Done"); done();
                    });
                });
            });
        });
    });

    it('should update content return the number of article updated', function(done) {
        d.create_article("test2_article", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);
            d.update_article("test2_article", null, "content updated!", 2333, function(err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);
                d.query_article("test2_article", function(err, result) {
                    assert.equal(err, null);
                    assert.equal(result.length, 1);
                    var article = result[0];
                    assert.equal(article.article_id, "test2_article");
                    assert.equal(article.view_count, 2333);
                    assert.equal(article.preview.toString(), article_example);
                    assert.equal(article.content.toString(), "content updated!");
                    d.delete_article("test2_article", function (err, result) {
                        assert.equal(err, null);
                        assert.equal(result.affectedRows, 1);
                        console.log("  Done"); done();
                    });
                });
            });
        });
    });

    it('should update view_count return the number of article updated', function(done) {
        d.create_article("test2_article", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);
            d.update_article("test2_article", null, null, 31415926, function(err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);
                d.query_article("test2_article", function(err, result) {
                    assert.equal(err, null);
                    assert.equal(result.length, 1);
                    var article = result[0];
                    assert.equal(article.article_id, "test2_article");
                    assert.equal(article.view_count, 31415926);
                    assert.equal(article.preview.toString(), article_example);
                    assert.equal(article.content.toString(), article_example);
                    d.delete_article("test2_article", function (err, result) {
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
        d.create_article("test2_article", article_example, article_example, function(err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);

            d.delete_article("test2_article", function (err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);
                console.log("  Done"); done();
            });
        });
    });
});

var category_example = "xzcF烫烫烫，屯屯屯，锘锘锘FFFF  ";

describe('testQueryCategory', function() {
    it('should return a specified category', function(done) {
        d.query_category("test1", function(err, result) {
            assert.equal(err, null);
            assert.equal(result.length, 1);
            var category = result[0];
            assert.equal(category.category_id, "test1");
            assert.equal(category.display_name.toString(), "example");
            assert.equal(category.sector_id.toString(), "blog");
            assert.equal(category.category_type.toString(), "side");
            assert.equal(category.article_list.toString(), "[]");
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

describe('testCreateCategory', function() {
    it('should return the number of category created', function(done) {
        d.create_category("test2_category", category_example, "game", "top", "[]", function (err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);

            d.query_category("test2_category", function (err, result) {
                assert.equal(err, null);
                assert.equal(result.length, 1);
                var category = result[0];
                assert.equal(category.category_id, "test2_category");
                assert.equal(category.display_name.toString(), category_example);
                assert.equal(category.sector_id.toString(), "game");
                assert.equal(category.category_type.toString(), "top");
                assert.equal(category.article_list.toString(), "[]");
                d.delete_category("test2_category", function (err, result) {
                    assert.equal(err, null);
                    assert.equal(result.affectedRows, 1);
                    console.log("  Done"); done();
                });
            });
        });
    });
});

describe('testUpdateCategory', function() {
    it('should update display_name and return the number of category updated', function(done) {
        d.create_category("test2_category", category_example, "game", "top", "[]", function (err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);

            d.update_category("test2_category", "display_name updated!", null, null, null, function (err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);

                d.query_category("test2_category", function (err, result) {
                    assert.equal(err, null);
                    assert.equal(result.length, 1);
                    var category = result[0];
                    assert.equal(category.category_id, "test2_category");
                    assert.equal(category.display_name.toString(), "display_name updated!");
                    assert.equal(category.sector_id.toString(), "game");
                    assert.equal(category.category_type.toString(), "top");
                    assert.equal(category.article_list.toString(), "[]");
                    d.delete_category("test2_category", function (err, result) {
                        assert.equal(err, null);
                        assert.equal(result.affectedRows, 1);
                        console.log("  Done"); done();
                    });
                });
            })
        });
    });
    it('should update sector_id and return the number of category updated', function(done) {
        d.create_category("test2_category", category_example, "game", "top", "[]", function (err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);

            d.update_category("test2_category", null, "blog", null, null, function (err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);

                d.query_category("test2_category", function (err, result) {
                    assert.equal(err, null);
                    assert.equal(result.length, 1);
                    var category = result[0];
                    assert.equal(category.category_id, "test2_category");
                    assert.equal(category.display_name.toString(), category_example);
                    assert.equal(category.sector_id.toString(), "blog");
                    assert.equal(category.category_type.toString(), "top");
                    assert.equal(category.article_list.toString(), "[]");
                    d.delete_category("test2_category", function (err, result) {
                        assert.equal(err, null);
                        assert.equal(result.affectedRows, 1);
                        console.log("  Done"); done();
                    });
                });
            })
        });
    });
    it('should update category_type and return the number of category updated', function(done) {
        d.create_category("test2_category", category_example, "game", "top", "[]", function (err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);

            d.update_category("test2_category", null, null, "side", null, function (err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);

                d.query_category("test2_category", function (err, result) {
                    assert.equal(err, null);
                    assert.equal(result.length, 1);
                    var category = result[0];
                    assert.equal(category.category_id, "test2_category");
                    assert.equal(category.display_name.toString(), category_example);
                    assert.equal(category.sector_id.toString(), "game");
                    assert.equal(category.category_type.toString(), "side");
                    assert.equal(category.article_list.toString(), "[]");
                    d.delete_category("test2_category", function (err, result) {
                        assert.equal(err, null);
                        assert.equal(result.affectedRows, 1);
                        console.log("  Done"); done();
                    });
                });
            })
        });
    });
    it('should update article_list and return the number of category updated', function(done) {
        d.create_category("test2_category", category_example, "game", "top", "[]", function (err, result) {
            assert.equal(err, null);
            assert.equal(result.affectedRows, 1);

            d.update_category("test2_category", null, null, null, '["cate1", "cate2"]', function (err, result) {
                assert.equal(err, null);
                assert.equal(result.affectedRows, 1);

                d.query_category("test2_category", function (err, result) {
                    assert.equal(err, null);
                    assert.equal(result.length, 1);
                    var category = result[0];
                    assert.equal(category.category_id, "test2_category");
                    assert.equal(category.display_name.toString(), category_example);
                    assert.equal(category.sector_id.toString(), "game");
                    assert.equal(category.category_type.toString(), "top");
                    assert.equal(category.article_list.toString(), '["cate1", "cate2"]');
                    d.delete_category("test2_category", function (err, result) {
                        assert.equal(err, null);
                        assert.equal(result.affectedRows, 1);
                        console.log("  Done"); done();
                    });
                });
            })
        });
    });
});