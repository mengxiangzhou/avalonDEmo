define(["zepto"], function () {
  return {
    alertBox: function (p, callback) {
      if ($('.m-box').length > 0) {
        $('.m-box').remove();
        $(".ab_cover").remove();
      }
      this.title = p.title || "";
      this.content = p.content || "";
      var btnsL = p.btns.length;
      this.btns = btnsL ? (function () {
        var btn;
        var _btns = "<div class='ab_btn_wrap'>";
        if (btnsL > 1) {
          for (i in p.btns) {
            _btns += "<a href='javascript:;' class='ab_btn ab_btn"+i+"'>" + p.btns[i].text + "</a>";
          }
        } else {
          _btns += "<a href='javascript:;' class='ab_btn single'>" + p.btns[0].text + "</a>";
        }
        _btns += "</div>";
        return _btns;
      })() : "";
      this.style = p.style || null;
      this.callback = callback || function () {
      };

      this.init = function () {
        $('.m-box,.ab_cover').remove();

        var htmlstr = "<div class='ab_cover'></div>";
        htmlstr += "<div class='m-box'>";
        if (this.title != "") {
          htmlstr += "<a href='javascript:;' class='ab_x'>x</a>";
          htmlstr += "<h3>" + this.title + "</h3>";
        }
        htmlstr += "<div class='ab_content'>" + this.content + "</div>";
        htmlstr += this.btns;
        htmlstr += "</div>";

        $('body').append(htmlstr);
        if (this.style) {
          $(".m-box").addClass(this.style);
        }
        var boxH = $('.m-box').height(), winH = $(window).height();
        $('.m-box').height(boxH > winH * 0.75 ? winH * 0.75 : boxH);
        $(".m-box").animate({
          'margin-top': -$(".m-box").height() / 2
        }, 100);
        //$('.ab_content').height($('.ab_content')[0].clientHeight);

        $('.ab_x').on('click', function () {
          $('.m-box,.ab_cover').remove();
        });
        $(".ab_btn").on({
          click: function () {
            var btnFunc = p.btns[$(this).index()].callback || function () {
                };
            btnFunc();
            if(p.btns[$(this).index()].close){
              $('.m-box,.ab_cover').remove();

            }
          }
        })
        // callback
        this.callback();
      }
      return this.init();
    },
    loadingFunc:function(){
      $(".m-loading").remove();
      var str = '<div class="m-loading"><div class="content"><i class="i-loading"></i>';
      str += '<p class="info">正在加载信息...</p></div></div>';
  	  $("body").append(str);
    },
    removeLoading:function(){
  	  $(".m-loading").remove();
    },
    verifiFunc:function(msg){
      $(".dbTools").remove();
      var str = '<div class="dbTools"><span>'+msg+'</span></div>';
      $("body").append(str);
    }
  }
  
});
