define("packageSent",["../mocks/json","zepto"],function(n){var o=avalon.define({$id:"packageSent",info:[]});return avalon.controller(function(n){n.$onEnter=function(){$("title").text("快递查询"),$.post("api/app/packageSendInfo",{},function(n){n.errorMsg||(o.info=n.data)},"json")},n.$onRendered=function(){},n.$onBeforeUnload=function(){}})});