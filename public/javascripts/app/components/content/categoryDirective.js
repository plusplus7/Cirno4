/**
 * Created by plusplus7 on 2016/12/10.
 */

app.controller("categoryCtrl", function($scope, $location, $route, api, ev){
    $scope.category_id      = "";
    $scope.display_name     = "";
    $scope.category_type    = "common";
    $scope.sector_id        = "blog";

    $scope.categoryShow = false;
    $scope.create_category_onclick = function () {
        api.CreateCategory($scope.category_id,
            $scope.display_name,
            $scope.sector_id,
            $scope.category_type).then(function (response) {
                console.log(response);
                if (response.data.Success) {
                    alert("Success");
                    window.location.reload();
                } else {
                    alert("Failed");
                }
        });
    };
    ev.registerListenerOnChange(function (event) {
        if (event & ev.ADD_CATEGORY) {
            $scope.categoryShow = true;
        } else {
            $scope.categoryShow = false;
        }
    });
});
