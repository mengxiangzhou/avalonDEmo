/**
 * Created by Administrator on 2015/9/23.
 */
define("sendList",["pub","swiper"],function(){
    var sendList = avalon.define({
        $id: 'sendList',
        pageNum:1

    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                $("title").text("上门收件");
            }
            // 视图渲染后，意思是avalon.scan完成 second
            $ctrl.$onRendered = function () {
                var numPerPage = 10;//每页条数
                var holdPosition = 0;
                var holdPosition2 = 0;
                var mySwiper = new Swiper('.swiper-container', {
                    slidesPerView: 'auto',
                    mode: 'vertical',
                    watchActiveIndex: true,
                    onTouchStart: function () {
                        holdPosition = 0;
                    },
                    onResistanceBefore: function (s, pos) {
                        holdPosition = pos;
                    },
                    onResistanceAfter: function (s, pos) {
                        holdPosition2 = pos;
                    },
                    onTouchEnd: function () {
                        if (holdPosition > 100) {
                            //alert("下拉刷新");
                            $(".preloader").removeClass("visible");
                            window.location.reload();
                        } else if (holdPosition2 > 100) {
                            //alert("上拉加载");
                            loading();
                            holdPosition2 = 0;
                        }
                    }
                });
                loading();
                function loading() {
                    sendList.pageNum++;
                    var htmlStr;
                    var nowDate = "2015-10-10 10:04";
                    htmlStr = "<section class='package'><div class='sent'><div class='sentBottom'><div>时间：" + nowDate + "</div><div>等待工作人员上门接收(处理中)</div>" +
                        "</div></div></section>";
                    mySwiper.appendSlide(htmlStr, 'swiper-slide', 'div');
                }

            }
            // 对应的视图销毁前
            $ctrl.$onBeforeUnload = function () {

            }
        }
    )
})
