
/**
 * Created by Administrator on 2015/9/25.
 */
define(["pub","mock"], function (pub) {
    var sendCheckSms = {
        "resultMsg":"发送成功",
        "resultCode": 0
    }
    var checkNum = {
        "resultMsg":"发送成功",
        "resultCode": 0
    }


    Mock.mock("jh-lingyi-web/user/userCtl/sendCheckSms", sendCheckSms);
    Mock.mock("weixin/app/user/checkNum", sendCheckSms);
})