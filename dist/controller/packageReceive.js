define("packageReceive",["../mocks/json","ui"],function(e,n){var o=avalon.define({$id:"packageReceive",receievedInfo:[],unReceieveInfo:[],appraise:["好评","中评","差评"],bReceive:0,unReceiveFunc:function(){o.bReceive=0},receivedFunc:function(){o.bReceive=1},bookFunc:function(){n.alertBox({title:"",content:"预约发货",btns:[{text:"取消",callback:function(){console.log("取消")},close:!0}]})}});return avalon.controller(function(e){e.$onEnter=function(){$("title").text("快递查询"),o.bReceive=0,0==o.unReceieveInfo.length&&$.post("api/app/packageInfo",{},function(e){if(!e.errorMsg)for(var n=0,c=e.data.length;c>n;n++)0==e.data[n].state?o.unReceieveInfo.push(e.data[n]):o.receievedInfo.push(e.data[n])},"json")},e.$onRendered=function(){},e.$onBeforeUnload=function(){}})});