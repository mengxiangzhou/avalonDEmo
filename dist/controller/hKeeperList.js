define("hKeeperList",["pub","swiper"],function(){var e=avalon.define({$id:"hKeeperList",pageNum:1});return avalon.controller(function(n){n.$onEnter=function(){$("title").text("管家套餐")},n.$onRendered=function(){function n(){e.pageNum++;var n;n="",t.appendSlide(n,"swiper-slide","div")}var o=0,i=0,t=new Swiper(".swiper-container",{slidesPerView:"auto",mode:"vertical",watchActiveIndex:!0,onTouchStart:function(){o=0},onResistanceBefore:function(e,n){o=n},onResistanceAfter:function(e,n){i=n},onTouchEnd:function(){o>100?($(".preloader").removeClass("visible"),window.location.reload()):i>100&&(n(),i=0)}});n()},n.$onBeforeUnload=function(){}})});