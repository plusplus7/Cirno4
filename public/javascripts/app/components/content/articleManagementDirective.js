/**
 * Created by plusplus7 on 2016/12/22.
 */

app.controller("articleManagerCtrl", function($scope, model, ev, api) {
    $scope.articles;
    $scope.articles_list = [];
    $scope.reload       = function() {
        $scope.articles     = model.get("articles");
        $scope.categories   = model.get("categories");
        for (var i=0; i<$scope.articles.length; i++) {
            var isRelated = false;
            for (var j=0; j<$scope.categories.length; j++) {
                if ($scope.categories[j].article_list.indexOf($scope.articles[i]) > -1) {
                    isRelated = true;
                    break;
                }
            }
            $scope.articles_list.push({
                id : $scope.articles[i],
                active : isRelated
            });
        }
    };
    $scope.articleManagerShow = false;
    $scope.article_delete_onclick = function(article_id) {
        api.DeleteArticle(article_id).then(function(res) {
            console.log(res);
            if (!res.data.Success) {
                alert("删除文章失败!");
            } else {
                alert("删除文章成功!");
                window.location.reload();
            }
        });
    };
    ev.registerListenerOnChange(function (event) {
        if (event & ev.MANAGE_ARTICLE) {
            $scope.articleManagerShow = true;
            $scope.reload();
        } else {
            $scope.articleManagerShow = false;
        }
    });
});
