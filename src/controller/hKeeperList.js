/**
 * Created by Administrator on 2015/9/23.
 */
define("hKeeperList",["pub","swiper"],function(){
    var hKeeperList = avalon.define({
        $id: 'hKeeperList',
        pageNum:1
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                $("title").text("管家套餐");
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
                    hKeeperList.pageNum++;
                    var htmlStr;
                    var nowDate = "2015-10-10 10:04";
                    htmlStr = "";
                    mySwiper.appendSlide(htmlStr, 'swiper-slide', 'div');
                }

            }
            // 对应的视图销毁前
            $ctrl.$onBeforeUnload = function () {

            }
        }
    )
})
