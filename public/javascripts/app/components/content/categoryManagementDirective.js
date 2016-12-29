/**
 * Created by plusplus7 on 2016/12/27.
 */

app.controller("categoryManagerCtrl", function($scope, model, ev, api) {
    $scope.categories = "";
    $scope.articles = "";

    $scope.category_id = "";
    $scope.category = [];

    $scope.reload       = function() {
        $scope.categories   = model.get("categories");
        $scope.articles     = model.get("articles");
    };
    $scope.category_onclick = function(category_id) {
        $scope.category_id = category_id;
        for (var i=0; i<$scope.categories.length; i++) {
            if ($scope.categories[i].category_id == category_id) {
                $scope.category = $scope.categories[i];
            }
        }
    };

    $scope.update_category = function(category) {
        api.UpdateCategory(
            category.category_id,
            category.display_name,
            category.sector_id,
            category.category_type,
            JSON.stringify(category.article_list)
        ).then(function(response) {
            console.log(response);
            if (response.data.Success) {
                alert("Success");
            } else {
                alert("Failed");
                window.location.reload();
            }
        });
    };

    $scope.category_article_top_onclick = function(article_id) {
        var index = $scope.category.article_list.indexOf(article_id);
        if (index > -1) {
            $scope.category.article_list.splice(index, 1);
        }
        $scope.category.article_list.splice(0, 0, article_id);
        $scope.update_category($scope.category);
    };
    $scope.category_article_close_onclick = function(article_id) {
        var index = $scope.category.article_list.indexOf(article_id);
        if (index > -1) {
            $scope.category.article_list.splice(index, 1);
        }
        $scope.update_category($scope.category);
    };
    $scope.categoryManagerShow = false;

    $scope.add_category_submit = function(article_id) {
        $scope.category.article_list.push(article_id);
        $scope.update_category($scope.category);
    };
    ev.registerListenerOnChange(function (event) {
        if (event & ev.MANAGE_CATEGORY) {
            $scope.categoryManagerShow = true;
            $scope.reload();
        } else {
            $scope.categoryManagerShow = false;
        }
    });
});
