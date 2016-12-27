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
        api.CreateArticle(
            $scope.articleId,
            $scope.previewContent,
            $scope.postContent
        ).then(function (response) {
            console.log(response);
            if (!response.data.Success) {
                alert("添加文章失败!");
                return ;
            }
            api.GetCategory($scope.articleCategory).then(function (res) {
                console.log(res);
                if (!res.data.Success) {
                    alert("查询类目失败!");
                    return ;
                }
                res.data.Data.article_list.unshift($scope.articleId);
                api.UpdateCategory($scope.articleCategory, null, null, null,
                    JSON.stringify(res.data.Data.article_list)).then(function (res2) {
                        console.log(res2);
                        if (!res2.data.Success) {
                            alert("更新类目失败!");
                            return ;
                        }
                        alert("操作成功");
                        window.location.reload();
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
