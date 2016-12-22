/**
 * Created by plusplus7 on 2016/12/4.
 */

app.controller("sidebarCtrl", function($scope, $location, ev) {
    $scope.widgets = [
        {
            name : "追忆の神殿",
            pages : [
                {
                    name : "添加文章",
                    onclick : function() {
                        ev.invoke(ev.ADD_ARTICLE);
                    }
                },
                {
                    name : "添加分类",
                    onclick : function() {
                        ev.invoke(ev.ADD_CATEGORY);
                    }
                }
            ]
        },
        {
            name : "圣光の灵",
            pages : [
                {
                    name : "管理文章",
                    onclick : function() {
                        ev.invoke(ev.MANAGE_ARTICLE);
                    }
                }
            ]
        }
    ];
    $scope.sidebarShow = false;
    ev.registerListenerOnChange(function (event) {
        if (event & ev.SHOW_PREVIEW) {
            $scope.sidebarShow = false;
        } else if (event & (ev.QUIT_PREVIEW | ev.INIT)) {
            $scope.sidebarShow = true;
        }
    })
});
