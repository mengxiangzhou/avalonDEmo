define("infoDetail",["../mocks/infoDetail","../libs/ui"],function(n,i){var t=avalon.define({$id:"infoDetail",communityList:[],sectionList:[],phone:"13247373141",name:"",submitFunc:function(){return""==t.name?void i.verifiFunc("请输入您的姓名！"):void(location.href="#!/packageReceive")}});return avalon.controller(function(n){n.$onEnter=function(){main.bdClass="s-bdbg1",$.post("jh-lingyi-web/user/locateCtl/listCityCommunities",{},function(n){var i=n.communityList[0].communityId;t.communityList=n.communityList,$.post("jh-lingyi-web/user/locateCtl/communityDetail",{communityId:i},function(n){t.sectionList=n.sectionList},"json")},"json")},n.$onRendered=function(){},n.$onBeforeUnload=function(){main.bdClass="s-bdbg"}})});