/**
 * Created by Administrator on 2015/9/23.
 */
define("houseKeeper",["../mocks/json","zepto"],function(data){
    var houseKeeper = avalon.define({
        $id: 'houseKeeper',
        bSnap: false,
        index:'',
        price:'',
        snapUp:function(){
            houseKeeper.bSnap = true;
        },
        maskClick:function(){
            houseKeeper.bSnap = false;
        },
        selectPrice:function(index){
            houseKeeper.index=index;
            houseKeeper.price=houseKeeper.priceInfo[index].price+'元';
        },
        priceInfo:[{
            "id":"22a2bfd571824daeacb3bb19d866a4fc","price":"0.01","text":"1个月(30天)"
        },{
            "id":"579230166ba0423eaf616969ec28d843","price":"54","text":"3个月(90天)送1个月"
        },{
            "id":"4563d3d654104f5ca48db83eaa182fff","price":"108","text":"6个月(180天)送3个月"
        },{
            "id":"8627d3d654104f5ca48db83eaa182eed","price":"216","text":"12个月(360天)送6个月"
        }],
        goPay:function(){
            location.href="#!/hKeeperList";
        }

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
