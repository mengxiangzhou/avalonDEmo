/**
 * Created by Administrator on 2015/9/23.
 */
define("bookSent",["../mocks/json", "../libs/ui"], function (data, ui) {
    var bookSent = avalon.define({
        $id: 'bookSent',
        sendFunc: function () {// 我要发件
            var content = '您确认需要上门收件吗？';
            ui.alertBox({
                title: '', content: content, btns: [
                    {
                        'text': '取消', callback: function () {
                        console.log("取消")
                    }, 'close': true
                    }, {
                        'text': '确定', callback: function () {
                            var content1 = '么么哒~大白管家稍后将上门收件，主人请稍等'
                            ui.alertBox({
                                title: '', content: content1, btns: [
                                    {
                                        'text': '确定', callback: function () {
                                            location.href="#!/sendList"
                                        }, 'close': true
                                    }
                                ]
                            })
                        }, 'close': false
                    }
                ]
            }, function () {
                // 自定义函数
            })
        }
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                $("title").text("快递查询");

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
