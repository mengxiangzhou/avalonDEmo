/**
 * Created by Administrator on 2015/9/23.
 */
define("packageSent",["../mocks/json","zepto"],function(data){
    var packageSent = avalon.define({
        $id: 'packageSent',
        info:[]
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                $("title").text("快递查询");
                // 获取数据
                $.post("api/app/packageSendInfo",{},function(data){
                    if(!data.errorMsg){
                        packageSent.info = data.data;
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
