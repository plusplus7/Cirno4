/**
 * Created by plusplus7 on 2016/12/27.
 */

app.controller("categoryManagerCtrl", function($scope, model, ev) {
    $scope.categories;
    $scope.articles_list = [];
    $scope.category_articles = [];
    $scope.reload       = function() {
        $scope.categories   = model.get("categories");
    };
    $scope.category_onclick = function(category_id) {
        for (var i=0; i<$scope.categories.length; i++) {
            if ($scope.categories[i].category_id == category_id) {
                $scope.category_articles = $scope.categories[i].article_list;
            }
        }
    };
    $scope.category_article_top_onclick = function(article_id) {
        var index = $scope.category_articles.indexOf(article_id);
        if (index > -1) {
            $scope.category_articles.splice(index, 1);
        }
        $scope.category_articles.splice(0, 0, article_id);
    };
    $scope.category_article_close_onclick = function(article_id) {
        var index = $scope.category_articles.indexOf(article_id);
        if (index > -1) {
            $scope.category_articles.splice(index, 1);
        }
    };
    $scope.categoryManagerShow = false;
    ev.registerListenerOnChange(function (event) {
        if (event & ev.MANAGE_CATEGORY) {
            $scope.categoryManagerShow = true;
            $scope.reload();
        } else {
            $scope.categoryManagerShow = false;
        }
    });
});
