/**
 * Created by Administrator on 2015/9/25.
 */
define("mobileAuth",["../mocks/auth","../libs/ui"],function(data,ui){
    var auth = avalon.define({
        $id: 'auth',
        authPhone:'',
        verifiVal:'',
        bPhone:true,
        bNext:true,
        btnValue:"获取验证码",
        bBtn:false,
        // 获取验证码
        getVal:function(){
            // 手机号不能为空
            var re = /^1[3|4|5|8][0-9]{9}$/;
            if(auth.authPhone == ''){
                ui.verifiFunc("手机号不能为空！");
                return;
            }
            if(!re.test(auth.authPhone)){
                ui.verifiFunc("请输入正确的手机号码！");
                return;
            }
            ui.loadingFunc();
            setTimeout(function(){
                ui.removeLoading()
            },500)
            $.post("jh-lingyi-web/user/userCtl/sendCheckSms",{phone:auth.phone},function(data){
                if(data.resultCode == 0){// 获取到手机号了
                    auth.bPhone = false;
                    auth.bBtn = true;
                    auth.bNext = false;
                    ui.verifiFunc("验证码已发送到手机，请注意查收！");
                    clearInterval(setVal)
                    var begin = 60;
                    var setVal = setInterval(function(){
                        begin--;
                        auth.btnValue=begin+"s重新发送";
                        if(begin < 0){
                            auth.btnValue="获取验证码";
                            auth.bBtn = false;
                            clearInterval(setVal)
                        }
                    },1000)
                }else if(data.resultCode == 1){ // 该手机号已注册
                    ui.verifiFunc("该手机号码已注册！");
                }
            },'json');
        },
        nextFunc:function(){
            if(auth.verifiVal == ''){
                ui.verifiFunc("验证码不能为空！");
                return;
            }
            $.post("weixin/app/user/checkNum",{mobile:auth.phone,checkcode:auth.verifiVal},function(data){
                if(data.resultCode == 0){// 验证码正确
                    location.href="#!/infoDetail"
                }else if(data.resultCode == 1){ // 验证码不正确
                    ui.verifiFunc("验证码不正确！");
                }
            },'json');

        }
    })

    return avalon.controller(function ($ctrl) {
            // 进入视图 first
            $ctrl.$onEnter = function () {
                main.bdClass = 's-bdbg1';
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
