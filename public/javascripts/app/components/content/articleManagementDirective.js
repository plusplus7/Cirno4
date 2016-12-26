/**
 * Created by plusplus7 on 2016/12/22.
 */

app.controller("categoryManagerCtrl", function($scope, model, ev) {
    $scope.categories;
    $scope.articles;
    $scope.articles_list = [];
    $scope.category_articles = [];
    $scope.reload       = function() {
        $scope.categories   = model.get("categories");
        $scope.articles     = model.get("articles");
        for (var i=0; i<$scope.articles.length; i++) {
            $scope.articles_list.push({
                name : $scope.articles[i]
            });
        }
    };
    $scope.category_onclick = function(category_id) {
        for (var i=0; i<$scope.categories.length; i++) {
            if ($scope.categories[i].category_id == category_id) {
                $scope.category_articles = $scope.categories[i].article_list;
            }
        }
    };
    $scope.categoryManagerShow = false;
    ev.registerListenerOnChange(function (event) {
        if (event & ev.MANAGE_ARTICLE) {
            $scope.categoryManagerShow = true;
            $scope.reload();
        } else {
            $scope.categoryManagerShow = false;
        }
    });
});
