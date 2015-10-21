/**
 * Created by Administrator on 2015/9/23.
 */
define("express",["../mocks/json","zepto"],function(data){
    var express = avalon.define({
        $id: 'express',
        info:[]
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                $.post("api/app/packageSendInfo",{},function(data){
                    if(!data.errorMsg){
                        express.info = data.data;
                    }
                },'json')
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
