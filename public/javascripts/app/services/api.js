/**
 * Created by plusplus7 on 2016/12/4.
 */

app.factory('api', function($http, $httpParamSerializer) {
    var apiService = {
        password: "",
        invoke  : function(url, params) {
            params.password = this.password;
            var promise = $http({
                url: url,
                method: "POST",
                data: $httpParamSerializer(params),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            return promise;
        },
        SetPassword : function(pass) {
            this.password = pass;
        },
        ListCategories : function () {
            return this.invoke("/api/ListCategories",{});
        },
        ListArticles : function () {
            return this.invoke("/api/ListArticles",{});
        },
        CreateArticle : function (article_id, preview, content) {
            return this.invoke("/api/CreateArticle",{
                article_id : article_id,
                preview    : preview,
                content    : content
            });
        },
        DeleteArticle : function(article_id) {
            return this.invoke("/api/DeleteArticle", {
                article_id: article_id
            });

        },
        GetCategory : function (category_id) {
            return this.invoke("/api/GetCategory", {
                category_id: category_id
            });
        },
        UpdateCategory : function (category_id, display_name, sector_id, category_type, article_list) {
            return this.invoke("/api/UpdateCategory", {
                category_id:    category_id,
                display_name:   display_name,
                sector_id:      sector_id,
                category_type:  category_type,
                article_list:   article_list
            });
        }
    };
    return apiService;
});
