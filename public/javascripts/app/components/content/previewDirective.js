/**
 * Created by plusplus7 on 2016/12/10.
 */

app.controller("previewCtrl", function($scope, $location, $route, model, ev){
    $scope.previewShow = false;
    $scope.type = "prev";
    $scope.content = "";
    var preparePreview = function(data) {
        $scope.type = data.type;
        $scope.content = data.content;
    };
    ev.registerListenerOnChange(function (event) {
        if (event & (ev.INIT | ev.QUIT_PREVIEW)) {
            $scope.previewShow = false;
        } else if (event & ev.SHOW_PREVIEW) {
            $scope.previewShow = true;
            console.log(model.get("preview"));
            preparePreview(model.get("preview"));
        }
    });
});

