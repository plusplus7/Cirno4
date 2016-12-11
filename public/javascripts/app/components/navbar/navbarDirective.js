/**
 * Created by plusplus7 on 2016/12/4.
 */

app.controller("navbarCtrl", function($scope, $window, ev) {
    $scope.buttons = [
        {
            name: " 主  页",
            show: true,
            onclick: function () {
                $window.location.href = "/";
            }
        },
        {
            name    : "退出预览",
            show    : false,
            onclick : function () {
                ev.invoke(ev.QUIT_PREVIEW);
                $window.history.back();
            }
        }
    ];
    ev.registerListenerOnChange(function (event) {
        if (event & ev.SHOW_PREVIEW) {
            $scope.buttons[1].show = true;
        } else if (event & ev.QUIT_PREVIEW) {
            $scope.buttons[1].show = false;
        }
    })
});