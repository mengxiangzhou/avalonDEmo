/**
 * Created by Administrator on 2015/9/23.
 */
define("index",["../mocks/json","zepto"],function(data){
    var index = avalon.define({
        $id: 'index'
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
            }
            // 视图渲染后，意思是avalon.scan完成 second
            $ctrl.$onRendered = function () {

            }
            // 对应的视图销毁前
            $ctrl.$onBeforeUnload = function () {

            }
        }
    )
})
