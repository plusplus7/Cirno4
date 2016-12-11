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
        }
    };
    return apiService;
});
