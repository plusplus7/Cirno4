/**
 * Created by plusplus7 on 2016/12/27.
 */

app.controller("categoryManagerCtrl", function($scope, model, ev, api) {
    $scope.categories;
    $scope.category_id = "";
    $scope.category = [];
    $scope.reload       = function() {
        $scope.categories   = model.get("categories");
    };
    $scope.category_onclick = function(category_id) {
        $scope.category_id = category_id;
        for (var i=0; i<$scope.categories.length; i++) {
            if ($scope.categories[i].category_id == category_id) {
                $scope.category = $scope.categories[i];
            }
        }
    };
    $scope.category_article_top_onclick = function(article_id) {
        var index = $scope.category.article_list.indexOf(article_id);
        if (index > -1) {
            $scope.category.article_list.splice(index, 1);
        }
        $scope.category.article_list.splice(0, 0, article_id);
        api.UpdateCategory(
            $scope.category.category_id,
            $scope.category.display_name,
            $scope.category.sector_id,
            $scope.category.category_type,
            JSON.stringify($scope.category.article_list)
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
    $scope.category_article_close_onclick = function(article_id) {
        var index = $scope.category.article_list.indexOf(article_id);
        if (index > -1) {
            $scope.category.article_list.splice(index, 1);
        }
        api.UpdateCategory(
            $scope.category.category_id,
            $scope.category.display_name,
            $scope.category.sector_id,
            $scope.category.category_type,
            JSON.stringify($scope.category.article_list)
        ).then(function(response) {
            console.log(response.data);
            if (response.data.Success) {
                alert("Success");
            } else {
                alert("Failed");
                window.location.reload();
            }
        });
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
