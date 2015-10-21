/**
 * Created by Administrator on 2015/9/25.
 */
define(["pub", "mock"], function (pub) {
    var listCityCommunities =
    {
        "communityList":[
            {
                "communityId":"ccdss1",
                "communityName":"君华香柏广场"
            }
        ]
    }

    var communityDetail =
    {
        "sectionList": [
            {
                "sectionName": "2区",
                "sectionId": "abc1",
                "buildingList": [
                    {
                        "buildingName": "2栋",
                        "buildingId": "abc1",
                        "levelList": [
                            {
                                "levelName": "2层",
                                "levelId": "abc1",
                                "apartmentList": [
                                    {
                                        "apartmentName": "203室 ",
                                        "apartmentId": "abc1",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }


    Mock.mock("jh-lingyi-web/user/locateCtl/listCityCommunities", listCityCommunities);// 小区
    Mock.mock("jh-lingyi-web/user/locateCtl/communityDetail", communityDetail);// 小区详细信息
})