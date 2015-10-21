/**
 * Created by Administrator on 2015/9/23.
 */
define("changeAddress",["../mocks/json","zepto"],function(data){
    var changeAddress = avalon.define({
        $id: 'changeAddress',
        addressSubmit:function(){
            location.href='#!/myInfo';
        }
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                main.bdClass = 's-bdbg1';
            }
            // 视图渲染后，意思是avalon.scan完成 second
            $ctrl.$onRendered = function () {

            }
            // 对应的视图销毁前
            $ctrl.$onBeforeUnload = function () {
                main.bdClass = 's-bdbg';
            }
        }
    )
})
