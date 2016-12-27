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
                    active : true,
                    onclick : function() {
                        $scope.widgets_click(this);
                        ev.invoke(ev.ADD_ARTICLE);
                    }
                },
                {
                    name : "添加分类",
                    active : false,
                    onclick : function() {
                        $scope.widgets_click(this);
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
                        $scope.widgets_click(this);
                        ev.invoke(ev.MANAGE_ARTICLE);
                    }
                },
                {
                    name : "管理分类",
                    onclick : function() {
                        $scope.widgets_click(this);
                        ev.invoke(ev.MANAGE_CATEGORY);
                    }
                },
                {
                    name : "身份管理",
                    onclick : function() {
                        $scope.widgets_click(this);
                        ev.invoke(ev.SECURITY);
                    }
                }
            ]
        }
    ];
    $scope.widgets_active = $scope.widgets[0].pages[0];
    $scope.widgets_click = function(page) {
        $scope.widgets_active.active = false;
        $scope.widgets_active = page;
        $scope.widgets_active.active = true;
    };
    $scope.sidebarShow = false;
    ev.registerListenerOnChange(function (event) {
        if (event & ev.SHOW_PREVIEW) {
            $scope.sidebarShow = false;
        } else if (event & (ev.QUIT_PREVIEW | ev.INIT)) {
            $scope.sidebarShow = true;
        }
    })
});
