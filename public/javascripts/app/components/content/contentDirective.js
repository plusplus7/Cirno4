/**
 * Created by plusplus7 on 2016/12/4.
 */

app.controller("contentCtrl", function($scope, $location, $route, api, ev, model){
    $scope.categories = model.get('categories');

    $scope.articleId = "";
    $scope.previewContent = "";
    $scope.articleCategory = $scope.categories[0].category_id;
    $scope.postContent = "";
    $scope.password = "";
    $scope.sectorId = "blog";
    $scope.articleTitle = "";
    $scope.authorLink   = "http://plusplus7.com";
    $scope.authorName   = "plusplus7";
    $scope.timeTag      = new Date().getFullYear() + "." + (new Date().getMonth()+1) + "." + new Date().getDate();

    $scope.progress = {
        show : false,
        info : "",
        value : 0
    };
    $scope.generateTemplate = function () {
        $scope.previewContent = document.getElementById("previewTemplateId").innerHTML;
        $scope.postContent = document.getElementById("postTemplateId").innerHTML;
    };
    $scope.previewPreviewOnClick = function() {
        model.set("preview", {
            type : "prev",
            content : $scope.previewContent
        });
        ev.invoke(ev.SHOW_PREVIEW);
    };

    $scope.postPreviewOnClick = function () {
        model.set("preview", {
            type : "post",
            content : $scope.postContent
        });
        ev.invoke(ev.SHOW_PREVIEW);

    };
    $scope.submitPostOnClick = function () {
        $scope.progress = {
            show: true,
            info: "添加文章ing",
            value: 10
        };
        api.CreateArticle(
            $scope.articleId,
            $scope.previewContent,
            $scope.postContent
        ).then(function (response) {
            console.log(response);
            if (!response.data.Success) {
                $scope.progress.info = "添加文章失败!";
                alert($scope.progress.info);
                return ;
            }
            $scope.progress = {
                show: true,
                info: "关联类目ing",
                value: 40
            };
            api.GetCategory($scope.articleCategory).then(function (res) {
                console.log(res);
                if (!res.data.Success) {
                    $scope.progress.info = "查询类目失败!";
                    alert($scope.progress.info);
                    return ;
                }
                $scope.progress.value = 80;
                res.data.Data.article_list.unshift($scope.articleId);
                api.UpdateCategory($scope.articleCategory, null, null, null,
                    JSON.stringify(res.data.Data.article_list)).then(function (res2) {
                        console.log(res2);
                        if (!res2.data.Success) {
                            $scope.progress.info = "更新类目失败!";
                            alert($scope.progress.info);
                            return ;
                        }
                        $scope.progress.value = 100;
                        $scope.progress.info = "操作成功";
                        alert($scope.progress.info);
                        $scope.progress.show = false;
                    });
            });
        });
    };

    $scope.contentShow = true;
    ev.registerListenerOnChange(function (event) {
        if (event & (ev.INIT | ev.QUIT_PREVIEW)) {
            $scope.contentShow = true;
        } else {
            $scope.contentShow = false;
        }
    });
});
