/**
 * Created by plusplus7 on 2016/12/10.
 */

app.controller("categoryCtrl", function($scope, $location, $route, api, ev){
    $scope.categoryShow = false;
    ev.registerListenerOnChange(function (event) {
        if (event & ev.ADD_CATEGORY) {
            $scope.categoryShow = true;
        } else {
            $scope.categoryShow = false;
        }
    });
});
