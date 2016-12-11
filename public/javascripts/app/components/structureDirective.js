/**
 * Created by plusplus7 on 2016/12/10.
 */

app.controller("structureCtrl", function($scope,api, model){
    $scope.structureShow = false;
    model.loadData(function () {
        $scope.structureShow = (model.getStatus() == "OK");
    });
});
