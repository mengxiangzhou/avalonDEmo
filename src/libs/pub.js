define(function () {
    //扩展Date的format方法
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    return {
        GetQuery: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        },
        stripHTML: function (a) {
            var reTag = /<(?:.|\s)*?>/g;
            return a.replace(reTag, "");
        },

        /**
         *转换日期对象为日期字符串
         * @param l long值
         * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
         * @return 符合要求的日期字符串
         */
        getFormatDate:function(date, pattern){
            if (date == undefined) {
                date = new Date();
            }
            if (pattern == undefined) {
                pattern = "yyyy-MM-dd hh:mm";
            }
            return date.format(pattern);
        }
    }
})