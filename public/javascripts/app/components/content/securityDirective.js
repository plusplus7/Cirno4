/**
 * Created by plusplus7 on 2016/12/26.
 */

app.controller("securityCtrl", function($scope, api, ev){
    $scope.password = "";
    $scope.password_submit = function() {
        api.SetPassword($scope.password);
        console.log(api.password);
    }
    ev.registerListenerOnChange(function (event) {
        if (event & ev.SECURITY) {
            $scope.categoryShow = true;
        } else {
            $scope.categoryShow = false;
        }
    });
});
