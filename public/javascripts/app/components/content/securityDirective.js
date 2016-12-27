/**
 * Created by plusplus7 on 2016/12/26.
 */

app.controller("securityCtrl", function($scope, api, ev, $cookies){
    $scope.password = $cookies.get('password');
    api.SetPassword($scope.password);
    $scope.password_submit = function() {
        api.SetPassword($scope.password);
        $cookies.put('password', $scope.password);
        console.log(api.password);
        alert("done");
    }
    ev.registerListenerOnChange(function (event) {
        if (event & ev.SECURITY) {
            $scope.categoryShow = true;
        } else {
            $scope.categoryShow = false;
        }
    });
});
