/**
 * Created by plusplus7 on 2016/12/4.
 */

var app = angular.module("adminApp", ['ngRoute', 'ngSanitize']);

app.factory("ev", function($location, $rootScope) {
    var changeListeners = [];
    var event = 0;
    var ev = {
        INIT : 1<<0,
        ADD_ARTICLE : 1<<0,
        SHOW_PREVIEW : 1<<1,
        QUIT_PREVIEW : 1<<2,
        ADD_CATEGORY : 1<<3,
        invoke : function (e) {
            event = e;
            for (var i in changeListeners) {
                changeListeners[i](event);
            }
        },
        registerListenerOnChange : function (listener) {
            listener(this.INIT);
            changeListeners.push(listener);
        }
    };
    return ev;
});

app.factory("model", function(api) {
    var datas = {};
    var status = "NoGood";

    var models = {
        loadData : function (done) {
            api.ListCategories().then(function success(response) {
                if (response.status == 200 && response.data.success == true) {
                    datas.categories = response.data.data;
                    status = "OK";
                    done();
                } else {
                    console.error(response);
                    alert("Failed to load categories");
                }
            });
        },
        getStatus : function () {
            return status;
        },
        set : function(key, data) {
            datas[key] = data;
        },
        get : function (key) {
            return datas[key];
        }
    };
    return models;
});
