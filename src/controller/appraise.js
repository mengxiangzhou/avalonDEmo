/**
 * Created by Administrator on 2015/9/23.
 */
define("appraise",["../mocks/json","zepto"],function(data){
    var appraise = avalon.define({
        $id: 'appraise',
        arrayAppraise:["好评","中评","差评"],
        attitudeArray:[1,2,3,4,5],
        agingArray:[1,2,3,4,5],
        figureArray:[1,2,3,4,5],
        attitudeNum:0,
        agingNum:0,
        figureNum:0,
        info:{
            "appraiseState":0, // 0 好评 1 中评  2 差评
            "attitude":0,// 态度 1-5 星
            "aging":0,// 时效 1-5 星
            "figure":0, // 形象 1-5星
            "leaveMsg":'' // 留言
        },
        attitudeFunc:function(index){
            appraise.attitudeNum = index+1;
            appraise.info.attitude = appraise.attitudeNum;
        },
        agingFunc:function(index){
            appraise.agingNum = index+1;
            appraise.info.aging = appraise.agingNum;
        },
        figureFunc:function(index){
            appraise.figureNum = index+1;
            appraise.info.figure = appraise.figureNum;
        },
        submitFunc:function(){
            console.log(appraise.info);
            location.href="#!/packageReceive"
        }
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                $("title").text("服务评价");
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
