/**
 * Created by Administrator on 2015/9/23.
 */
define("packageReceive",["../mocks/json","ui"],function(data,ui){
    var packageReceive = avalon.define({
        $id: 'packageReceive',
        receievedInfo:[],
        unReceieveInfo:[],
        appraise:["好评","中评","差评"],
        bReceive:0,
        unReceiveFunc:function(){
            packageReceive.bReceive =0;
        },
        receivedFunc:function(){
            packageReceive.bReceive =1;
        },
        bookFunc:function(){
            ui.alertBox({title: '', content: '预约发货', btns:
                    [
                        {
                            'text': '取消', callback: function () {
                            console.log("取消")
                        }, 'close': true
                        }
                    ]
                });
        }
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                $("title").text("快递查询");
                packageReceive.bReceive=0;
                if(packageReceive.unReceieveInfo.length==0){
                    // 获取数据
                    $.post("api/app/packageInfo",{},function(data){
                        if(!data.errorMsg){
                            for(var i= 0,l=data.data.length;i<l;i++){
                                if(data.data[i].state == 0){
                                    packageReceive.unReceieveInfo.push(data.data[i])
                                }else{
                                    packageReceive.receievedInfo.push(data.data[i])
                                }
                            }
                        }
                    },'json')
                }

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
