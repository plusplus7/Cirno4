/**
 * Created by plusplus7 on 2016/12/22.
 */

app.controller("categoryManagerCtrl", function($scope, model, ev) {
    $scope.categories = model.get("categories");
    console.log($scope.categories);
    $scope.categoryManagerShow = false;
    ev.registerListenerOnChange(function (event) {
        if (event & ev.MANAGE_ARTICLE) {
            $scope.categoryManagerShow = true;
        } else {
            $scope.categoryManagerShow = false;
        }
    });
});
