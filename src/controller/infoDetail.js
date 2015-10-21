/**
 * Created by Administrator on 2015/9/23.
 */
define("infoDetail",["../mocks/infoDetail","../libs/ui"],function(data,ui){
    var infoDetail = avalon.define({
        $id: 'infoDetail',
        communityList:[],
        sectionList:[],
        phone:'13247373141',
        name:'',
        submitFunc:function(){
            if(infoDetail.name == ''){
                ui.verifiFunc("请输入您的姓名！");
                return;
            }
            location.href="#!/packageReceive"
        }
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                main.bdClass = 's-bdbg1';
                $.post("jh-lingyi-web/user/locateCtl/listCityCommunities",{},function(data){
                    var communityId = data.communityList[0].communityId;
                    infoDetail.communityList = data.communityList;
                    $.post("jh-lingyi-web/user/locateCtl/communityDetail",{communityId:communityId},function(data){
                        infoDetail.sectionList = data.sectionList
                    },'json');
                },'json');
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
