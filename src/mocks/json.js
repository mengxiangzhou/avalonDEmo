/**
 * Created by Administrator on 2015/9/23.
 */
define(["pub","mock"], function (pub) {
    var packageReceiveInfo = {
        "errorMsg":false,
        "data": [
            {
                "id":"001",
                "title":"顺丰快递",
                "orderNo":"100200300400",
                "img1":"res/img/expImg1.jpg",
                "img2":"res/img/expImg2.jpg",
                "arriveTime":"2015-07-25  18:58",
                "state":0, // 0 未收件 1 已收件
                "appraise":0 // 0未评价 1 好评 2 中评 3 差评
            },
            {
                "id":"002",
                "title":"顺丰快递",
                "orderNo":"100200300400",
                "img1":"res/img/expImg1.jpg",
                "img2":"res/img/expImg2.jpg",
                "arriveTime":"2015-08-25  18:58",
                "state":1, // 0 未收件 1 已收件
                "appraise":1 // 0未评价 1 好评 2 中评 3 差评

            },
            {
                "id":"003",
                "title":"顺丰快递",
                "orderNo":"100200300400",
                "img1":"res/img/expImg1.jpg",
                "img2":"res/img/expImg2.jpg",
                "arriveTime":"2015-09-25  18:58",
                "state":1, // 0 未收件 1 已收件
                "appraise":2 // 0未评价 1 好评 2 中评 3 差评
            },
            {
                "id":"004",
                "title":"顺丰快递",
                "orderNo":"100200300400",
                "img1":"res/img/expImg1.jpg",
                "img2":"res/img/expImg2.jpg",
                "arriveTime":"2015-10-25  18:58",
                "state":1, // 0 未收件 1 已收件
                "appraise":0 // 0未评价 1 好评 2 中评 3 差评
            },
            {
                "id":"005",
                "title":"顺丰快递",
                "orderNo":"100200300400",
                "img1":"res/img/expImg1.jpg",
                "img2":"res/img/expImg2.jpg",
                "arriveTime":"2015-09-25  18:58",
                "state":1, // 0 未收件 1 已收件
                "appraise":3 // 0未评价 1 好评 2 中评 3 差评
            }
        ]
    }
    var packageSendInfo = {
        "errorMsg":false,
        "data": [
            {
                "id":"001",
                "title":"顺丰快递",
                "orderNo":"100200300400",
                "arriveTime":"2015-07-25  18:58",
                "name":"名字一",
                'phone':'13688889999',
                "state":1 // 0 未发快递 1 已发快递
            },
            {
                "id":"002",
                "state":0 // 0 未发快递 1 已发快递

            }
        ]
    }
    Mock.mock("api/app/packageInfo", packageReceiveInfo);
    Mock.mock("api/app/packageSendInfo", packageSendInfo);
})