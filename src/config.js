/**
 * Created by Administrator on 2015/9/23.
 */
// 配置文件
require.config({
    debug: true,
    //urlArgs: 'ver=' + (new Date()).getTime(),
    baseUrl: './',
    paths: {
        avalon: 'libs/avalon.mobile.min',
        mmHistory: 'libs/mmHistory',
        mmRouter: 'libs/mmRouter',
        mmPromise: 'libs/mmPromise',
        mmState: 'libs/mmState',
        mmRequest: 'libs/mmRequest',
        mock: 'libs/mock-min',
        pub: 'libs/pub',
        zepto:'libs/zepto.min',
        ui:'libs/ui',
        swiper:'libs/swiper.js'
    },
    shim: {
        mock: {
            exports: 'mock'
        },
        zepto:{
            exports:'zepto'
        },
        swiper:{
            deps:['zepto'],
            exports:'swiper'
        }

    }
}); // 配置结束

// 初始化声明变量
var main,
    api_path,
    lStorage = window.localStorage,
    sStorage = window.sessionStorage,
    lStoragecache,
    sStorageCache,
    storageName,
    envUrl = env();

// 轮询
var checkLogin = function (callback) {
    console.log('checking login...')
    setTimeout(function () {
        if (false) {
            checkLogin(callback);
        } else {
            callback();
        }
    }, 500)
};

// todo 统计的预留接口
var accountFunc = function(){

};

// 后退
var back = function () {
    avalon.router.navigate(avalon.router.getLastPath());
};

// 主函数
require(['pub', 'zepto', 'mmState'], function (pub) {
    storageName = "dabaiApp"; // localSTorage
    //lStoragecache.removeItem(storageName);
    var cache1 = {"name":"mxz","age":"26"};
    lStorage.setItem(storageName,JSON.stringify(cache1));
    lStoragecache = JSON.parse(lStorage.getItem(storageName)) || {};
    var cache2 = {"name":"mxz","age":"26"};
    sStorage.setItem(storageName,JSON.stringify(cache2));
    sStorageCache = JSON.parse(sStorage.getItem(storageName))||{};
    api_path = {
        auth2link: envUrl + '/wap/api/common/auth2link'
    };
    main = avalon.define({
        $id: 'main',
        bdClass: 's-bdbg',
        stopPro:function(event){
            event.stopPropagation();
        }
    });

    //我的主页
    avalon.state('index', {
        url: '/',
        views: {
            'contain': {
                templateUrl: 'tpl/index.html',
                controllerUrl: 'controller/index'
            }
        }
    })

    avalon.state('mobileAuth', {
        url: '/mobileAuth',
        views: {
            'contain': {
                templateUrl: 'tpl/mobileAuth.html',
                controllerUrl: 'controller/mobileAuth'
            }
        }
    })

    avalon.state('packageReceive', {
        url: '/packageReceive',
        views: {
            'contain': {
                templateUrl: 'tpl/packageReceive.html',
                controllerUrl: 'controller/packageReceive'
            }
        }
    })

    avalon.state('my', {
        url: '/my',
        views: {
            'contain': {
                templateUrl: 'tpl/my.html',
                controllerUrl: 'controller/my'
            }
        }
    })
    avalon.state('packageSent', {
        url: '/packageSent',
        views: {
            'contain': {
                templateUrl: 'tpl/packageSent.html',
                controllerUrl: 'controller/packageSent'
            }
        }
    })

    avalon.state('bookSent', {
        url: '/bookSent',
        views: {
            'contain': {
                templateUrl: 'tpl/bookSent.html',
                controllerUrl: 'controller/bookSent'
            }
        }
    })

    avalon.state('appraise', {
        url: '/appraise',
        views: {
            'contain': {
                templateUrl: 'tpl/appraise.html',
                controllerUrl: 'controller/appraise'
            }
        }
    })

    avalon.state('express', {
        url: '/express',
        views: {
            'contain': {
                templateUrl: 'tpl/express.html',
                controllerUrl: 'controller/express'
            }
        }
    })

    avalon.state('packageReceive', {
        url: '/packageReceive',
        views: {
            'contain': {
                templateUrl: 'tpl/packageReceive.html',
                controllerUrl: 'controller/packageReceive'
            }
        }
    })

    avalon.state('infoDetail', {
        url: '/infoDetail',
        views: {
            'contain': {
                templateUrl: 'tpl/infoDetail.html',
                controllerUrl: 'controller/infoDetail'
            }
        }
    });

    avalon.state('sendList', {
        url: '/sendList',
        views: {
            'contain': {
                templateUrl: 'tpl/sendList.html',
                controllerUrl: 'controller/sendList'
            }
        }
    });

    avalon.state('hKeeperList', {
        url: '/hKeeperList',
        views: {
            'contain': {
                templateUrl: 'tpl/hKeeperList.html',
                controllerUrl: 'controller/hKeeperList'
            }
        }
    });
    avalon.state('washCarList', {
        url: '/washCarList',
        views: {
            'contain': {
                templateUrl: 'tpl/washCarList.html',
                controllerUrl: 'controller/washCarList'
            }
        }
    });

    avalon.state('myInfo', {
        url: '/myInfo',
        views: {
            'contain': {
                templateUrl: 'tpl/myInfo.html',
                controllerUrl: 'controller/myInfo'
            }
        }
    });

    avalon.state('rename', {
        url: '/rename',
        views: {
            'contain': {
                templateUrl: 'tpl/rename.html',
                controllerUrl: 'controller/rename'
            }
        }
    });

    avalon.state('changeAddress', {
        url: '/changeAddress',
        views: {
            'contain': {
                templateUrl: 'tpl/changeAddress.html',
                controllerUrl: 'controller/changeAddress'
            }
        }
    });


    avalon.state('houseKeeper', {
        url: '/houseKeeper',
        views: {
            'contain': {
                templateUrl: 'tpl/houseKeeper.html',
                controllerUrl: 'controller/houseKeeper'
            }
        }
    });

    avalon.state.config({
        onError: function (err) {
            console.log(err)
        },
        onLoad: function () {
            console.log('state is loaded')
        }
    });

    avalon.router.errorback = function () {
        alert('暂未开放');
    };
    avalon.history.start({
        basepath: "/"
        //html5Mode: true,//加了这个后，一直avalon.router.errorback
    });

    avalon.scan();
    avalon.ready(function () {// avalon加载完执行
        setTimeout(function(){
            avalon.require(["controller/appraise.js",
                "controller/bookSent.js",
                "controller/changeAddress.js",
                "controller/express.js",
                "controller/hKeeperList.js",
                "controller/houseKeeper.js",
                "controller/index.js",
                "controller/infoDetail.js",
                "controller/mobileAuth.js",
                "controller/my.js",
                "controller/myInfo.js",
                "controller/packageReceive.js",
                "controller/packageSent.js",
                "controller/rename.js",
                "controller/sendList.js",
                "controller/washCarList.js"
            ], function() {
            })
        },'2000')
    });
});
