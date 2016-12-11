/**
 * Created by plusplus7 on 2016/12/4.
 */

app.factory('api', function($http, $httpParamSerializer) {
    var apiService = {
        invoke  : function(url, params) {
            var promise = $http({
                url: url,
                method: "POST",
                data: $httpParamSerializer(params),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            return promise;
        },
        sign    : function(params) {
            return "";
        },
        ListCategories : function () {
            return this.invoke("/api/ListCategories",{});
        },
        CreateArticle : function (article_id, preview, content) {
            return this.invoke("/api/CreateArticle",{
                article_id : article_id,
                preview    : preview,
                content    : content
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
