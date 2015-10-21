/**
 * Created by Administrator on 2015/9/29.
 * return server url
 */
var env = function(){
    var serverUrl = '',uAgent = navigator.userAgent;
    if(uAgent.indexOf("daibaiApp")==-1){ // WeiXin
        serverUrl = "http://www.dev.dabai360.com"
    }else{ // App
        serverUrl = getServerRoot();
    }
    return serverUrl;
}
function getServerRoot(){// app get server url
    return "http://www.dev.dabai360.com"
}