(function(undefined){function find(e){function t(e,t){return"string"===Util.type(e)?e===t:"regexp"===Util.type(e)?e.test(t):void 0}for(var n in Mock._mocked){var r=Mock._mocked[n];if(!(r.rurl&&!t(r.rurl,e.url)||r.rtype&&!t(r.rtype,e.type.toLowerCase())))return r}}function convert(e,t){return Util.isFunction(e.template)?e.template(t):Mock.mock(e.template)}var Mock={version:"0.1.9",_mocked:{}},Util=function(){var e={};return e.extend=function(){var t,n,r,a,o,i=arguments[0]||{},s=1,l=arguments.length;for(1===l&&(i=this,s=0);l>s;s++)if(t=arguments[s])for(n in t)r=i[n],a=t[n],i!==a&&a!==undefined&&(e.isArray(a)||e.isObject(a)?(e.isArray(a)&&(o=r&&e.isArray(r)?r:[]),e.isObject(a)&&(o=r&&e.isObject(r)?r:{}),i[n]=e.extend(o,a)):i[n]=a);return i},e.each=function(e,t,n){var r,a;if("number"===this.type(e))for(r=0;e>r;r++)t(r,r);else if(e.length===+e.length)for(r=0;r<e.length&&t.call(n,e[r],r,e)!==!1;r++);else for(a in e)if(t.call(n,e[a],a,e)===!1)break},e.type=function(e){return null===e||e===undefined?String(e):Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1].toLowerCase()},e.each("String Object Array RegExp Function".split(" "),function(t){e["is"+t]=function(n){return e.type(n)===t.toLowerCase()}}),e.isObjectOrArray=function(t){return e.isObject(t)||e.isArray(t)},e.isNumeric=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},e.keys=function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t},e.values=function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(e[n]);return t},e.heredoc=function(e){return e.toString().replace(/^[^\/]+\/\*!?/,"").replace(/\*\/[^\/]+$/,"").replace(/^[\s\xA0]+/,"").replace(/[\s\xA0]+$/,"")},e.noop=function(){},e}(),Random=function(){var e={extend:Util.extend};return e.extend({"boolean":function(e,t,n){return n!==undefined?(e="undefined"==typeof e||isNaN(e)?1:parseInt(e,10),t="undefined"==typeof t||isNaN(t)?1:parseInt(t,10),Math.random()>1/(e+t)*e?!n:n):Math.random()>=.5},bool:function(e,t,n){return this["boolean"](e,t,n)},natural:function(e,t){return e="undefined"!=typeof e?parseInt(e,10):0,t="undefined"!=typeof t?parseInt(t,10):9007199254740992,Math.round(Math.random()*(t-e))+e},integer:function(e,t){return e="undefined"!=typeof e?parseInt(e,10):-9007199254740992,t="undefined"!=typeof t?parseInt(t,10):9007199254740992,Math.round(Math.random()*(t-e))+e},"int":function(e,t){return this.integer(e,t)},"float":function(e,t,n,r){n=n===undefined?0:n,n=Math.max(Math.min(n,17),0),r=r===undefined?17:r,r=Math.max(Math.min(r,17),0);for(var a=this.integer(e,t)+".",o=0,i=this.natural(n,r);i>o;o++)a+=this.character("number");return parseFloat(a,10)},character:function(t){var n={lower:"abcdefghijklmnopqrstuvwxyz",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",number:"0123456789",symbol:"!@#$%^&*()[]"};return n.alpha=n.lower+n.upper,n.undefined=n.lower+n.upper+n.number+n.symbol,t=n[(""+t).toLowerCase()]||t,t.charAt(e.natural(0,t.length-1))},"char":function(e){return this.character(e)},string:function(t,n,r){var a;3===arguments.length&&(a=e.natural(n,r)),2===arguments.length&&("string"==typeof arguments[0]?a=n:(a=e.natural(t,n),t=undefined)),1===arguments.length&&(a=t,t=undefined),0===arguments.length&&(a=e.natural(3,7));for(var o="",i=0;a>i;i++)o+=e.character(t);return o},str:function(e,t,n){return this.string(e,t,n)},range:function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1,e=+e,t=+t,n=+n;for(var r=Math.max(Math.ceil((t-e)/n),0),a=0,o=new Array(r);r>a;)o[a++]=e,e+=n;return o}}),e.extend({patternLetters:{yyyy:"getFullYear",yy:function(e){return(""+e.getFullYear()).slice(2)},y:"yy",MM:function(e){var t=e.getMonth()+1;return 10>t?"0"+t:t},M:function(e){return e.getMonth()+1},dd:function(e){var t=e.getDate();return 10>t?"0"+t:t},d:"getDate",HH:function(e){var t=e.getHours();return 10>t?"0"+t:t},H:"getHours",hh:function(e){var t=e.getHours()%12;return 10>t?"0"+t:t},h:function(e){return e.getHours()%12},mm:function(e){var t=e.getMinutes();return 10>t?"0"+t:t},m:"getMinutes",ss:function(e){var t=e.getSeconds();return 10>t?"0"+t:t},s:"getSeconds",SS:function(e){var t=e.getMilliseconds();return 10>t&&"00"+t||100>t&&"0"+t||t},S:"getMilliseconds",A:function(e){return e.getHours()<12?"AM":"PM"},a:function(e){return e.getHours()<12?"am":"pm"},T:"getTime"}}),e.extend({rformat:new RegExp(function(){var t=[];for(var n in e.patternLetters)t.push(n);return"("+t.join("|")+")"}(),"g"),format:function(t,n){var r=e.patternLetters,a=e.rformat;return n.replace(a,function(e,n){return"function"==typeof r[n]?r[n](t):r[n]in r?arguments.callee(e,r[n]):t[r[n]]()})},randomDate:function(e,t){return e=e===undefined?new Date(0):e,t=t===undefined?new Date:t,new Date(Math.random()*(t.getTime()-e.getTime()))},date:function(e){return e=e||"yyyy-MM-dd",this.format(this.randomDate(),e)},time:function(e){return e=e||"HH:mm:ss",this.format(this.randomDate(),e)},datetime:function(e){return e=e||"yyyy-MM-dd HH:mm:ss",this.format(this.randomDate(),e)},now:function(e,t){1===arguments.length&&(/year|month|week|day|hour|minute|second|week/.test(e)||(t=e,e="")),e=(e||"").toLowerCase(),t=t||"yyyy-MM-dd HH:mm:ss";var n=new Date;switch(e){case"year":n.setMonth(0);case"month":n.setDate(1);case"week":case"day":n.setHours(0);case"hour":n.setMinutes(0);case"minute":n.setSeconds(0);case"second":n.setMilliseconds(0)}switch(e){case"week":n.setDate(n.getDate()-n.getDay())}return this.format(n,t)}}),e.extend({ad_size:["300x250","250x250","240x400","336x280","180x150","720x300","468x60","234x60","88x31","120x90","120x60","120x240","125x125","728x90","160x600","120x600","300x600"],screen_size:["320x200","320x240","640x480","800x480","800x480","1024x600","1024x768","1280x800","1440x900","1920x1200","2560x1600"],video_size:["720x480","768x576","1280x720","1920x1080"],image:function(e,t,n,r,a){return 4===arguments.length&&(a=r,r=undefined),3===arguments.length&&(a=n,n=undefined),e||(e=this.pick(this.ad_size)),t&&~t.indexOf("#")&&(t=t.slice(1)),n&&~n.indexOf("#")&&(n=n.slice(1)),"http://dummyimage.com/"+e+(t?"/"+t:"")+(n?"/"+n:"")+(r?"."+r:"")+(a?"&text="+a:"")},img:function(){return this.image.apply(this,arguments)}}),e.extend({brandColors:{"4ormat":"#fb0a2a","500px":"#02adea","About.me (blue)":"#00405d","About.me (yellow)":"#ffcc33",Addvocate:"#ff6138",Adobe:"#ff0000",Aim:"#fcd20b",Amazon:"#e47911",Android:"#a4c639","Angie's List":"#7fbb00",AOL:"#0060a3",Atlassian:"#003366",Behance:"#053eff","Big Cartel":"#97b538",bitly:"#ee6123",Blogger:"#fc4f08",Boeing:"#0039a6","Booking.com":"#003580",Carbonmade:"#613854",Cheddar:"#ff7243","Code School":"#3d4944",Delicious:"#205cc0",Dell:"#3287c1",Designmoo:"#e54a4f",Deviantart:"#4e6252","Designer News":"#2d72da",Devour:"#fd0001",DEWALT:"#febd17","Disqus (blue)":"#59a3fc","Disqus (orange)":"#db7132",Dribbble:"#ea4c89",Dropbox:"#3d9ae8",Drupal:"#0c76ab",Dunked:"#2a323a",eBay:"#89c507",Ember:"#f05e1b",Engadget:"#00bdf6",Envato:"#528036",Etsy:"#eb6d20",Evernote:"#5ba525","Fab.com":"#dd0017",Facebook:"#3b5998",Firefox:"#e66000","Flickr (blue)":"#0063dc","Flickr (pink)":"#ff0084",Forrst:"#5b9a68",Foursquare:"#25a0ca",Garmin:"#007cc3",GetGlue:"#2d75a2",Gimmebar:"#f70078",GitHub:"#171515","Google Blue":"#0140ca","Google Green":"#16a61e","Google Red":"#dd1812","Google Yellow":"#fcca03","Google+":"#dd4b39",Grooveshark:"#f77f00",Groupon:"#82b548","Hacker News":"#ff6600",HelloWallet:"#0085ca","Heroku (light)":"#c7c5e6","Heroku (dark)":"#6567a5",HootSuite:"#003366",Houzz:"#73ba37",HTML5:"#ec6231",IKEA:"#ffcc33",IMDb:"#f3ce13",Instagram:"#3f729b",Intel:"#0071c5",Intuit:"#365ebf",Kickstarter:"#76cc1e",kippt:"#e03500",Kodery:"#00af81",LastFM:"#c3000d",LinkedIn:"#0e76a8",Livestream:"#cf0005",Lumo:"#576396",Mixpanel:"#a086d3",Meetup:"#e51937",Nokia:"#183693",NVIDIA:"#76b900",Opera:"#cc0f16",Path:"#e41f11","PayPal (dark)":"#1e477a","PayPal (light)":"#3b7bbf",Pinboard:"#0000e6",Pinterest:"#c8232c",PlayStation:"#665cbe",Pocket:"#ee4056",Prezi:"#318bff",Pusha:"#0f71b4",Quora:"#a82400","QUOTE.fm":"#66ceff",Rdio:"#008fd5",Readability:"#9c0000","Red Hat":"#cc0000",Resource:"#7eb400",Rockpack:"#0ba6ab",Roon:"#62b0d9",RSS:"#ee802f",Salesforce:"#1798c1",Samsung:"#0c4da2",Shopify:"#96bf48",Skype:"#00aff0",Snagajob:"#f47a20",Softonic:"#008ace",SoundCloud:"#ff7700","Space Box":"#f86960",Spotify:"#81b71a",Sprint:"#fee100",Squarespace:"#121212",StackOverflow:"#ef8236",Staples:"#cc0000","Status Chart":"#d7584f",Stripe:"#008cdd",StudyBlue:"#00afe1",StumbleUpon:"#f74425","T-Mobile":"#ea0a8e",Technorati:"#40a800","The Next Web":"#ef4423",Treehouse:"#5cb868",Trulia:"#5eab1f",Tumblr:"#34526f","Twitch.tv":"#6441a5",Twitter:"#00acee",TYPO3:"#ff8700",Ubuntu:"#dd4814",Ustream:"#3388ff",Verizon:"#ef1d1d",Vimeo:"#86c9ef",Vine:"#00a478",Virb:"#06afd8","Virgin Media":"#cc0000",Wooga:"#5b009c","WordPress (blue)":"#21759b","WordPress (orange)":"#d54e21","WordPress (grey)":"#464646",Wunderlist:"#2b88d9",XBOX:"#9bc848",XING:"#126567","Yahoo!":"#720e9e",Yandex:"#ffcc00",Yelp:"#c41200",YouTube:"#c4302b",Zalongo:"#5498dc",Zendesk:"#78a300",Zerply:"#9dcc7a",Zootool:"#5e8b1d"},brands:function(){var e=[];for(var t in this.brandColors)e.push(t);return e},dataImage:function(e,t){var n="undefined"!=typeof document&&document.createElement("canvas"),r=n&&n.getContext&&n.getContext("2d");if(!n||!r)return"";e||(e=this.pick(this.ad_size)),t=t!==undefined?t:e,e=e.split("x");var a=parseInt(e[0],10),o=parseInt(e[1],10),i=this.brandColors[this.pick(this.brands())],s="#FFF",l=14,u="sans-serif";return n.width=a,n.height=o,r.textAlign="center",r.textBaseline="middle",r.fillStyle=i,r.fillRect(0,0,a,o),r.fillStyle=s,r.font="bold "+l+"px "+u,r.fillText(t,a/2,o/2,a),n.toDataURL("image/png")}}),e.extend({color:function(){var e=Math.floor(16777215*Math.random()).toString(16);return e="#"+("000000"+e).slice(-6)}}),e.extend({capitalize:function(e){return(e+"").charAt(0).toUpperCase()+(e+"").substr(1)},upper:function(e){return(e+"").toUpperCase()},lower:function(e){return(e+"").toLowerCase()},pick:function(e){return e=e||[],e[this.natural(0,e.length-1)]},shuffle:function(e){e=e||[];for(var t=e.slice(0),n=[],r=0,a=t.length,o=0;a>o;o++)r=this.natural(0,t.length-1),n.push(t[r]),t.splice(r,1);return n}}),e.extend({paragraph:function(t,n){var r;0===arguments.length&&(r=e.natural(3,7)),1===arguments.length&&(r=n=t),2===arguments.length&&(t=parseInt(t,10),n=parseInt(n,10),r=e.natural(t,n));for(var a=[],o=0;r>o;o++)a.push(e.sentence());return a.join(" ")},sentence:function(t,n){var r;0===arguments.length&&(r=e.natural(12,18)),1===arguments.length&&(r=n=t),2===arguments.length&&(t=parseInt(t,10),n=parseInt(n,10),r=e.natural(t,n));for(var a=[],o=0;r>o;o++)a.push(e.word());return e.capitalize(a.join(" "))+"."},word:function(t,n){var r;0===arguments.length&&(r=e.natural(3,10)),1===arguments.length&&(r=n=t),2===arguments.length&&(t=parseInt(t,10),n=parseInt(n,10),r=e.natural(t,n));for(var a="",o=0;r>o;o++)a+=e.character("lower");return a},title:function(t,n){var r,a=[];0===arguments.length&&(r=e.natural(3,7)),1===arguments.length&&(r=n=t),2===arguments.length&&(t=parseInt(t,10),n=parseInt(n,10),r=e.natural(t,n));for(var o=0;r>o;o++)a.push(this.capitalize(this.word()));return a.join(" ")}}),e.extend({first:function(){var e=["James","John","Robert","Michael","William","David","Richard","Charles","Joseph","Thomas","Christopher","Daniel","Paul","Mark","Donald","George","Kenneth","Steven","Edward","Brian","Ronald","Anthony","Kevin","Jason","Matthew","Gary","Timothy","Jose","Larry","Jeffrey","Frank","Scott","Eric"].concat(["Mary","Patricia","Linda","Barbara","Elizabeth","Jennifer","Maria","Susan","Margaret","Dorothy","Lisa","Nancy","Karen","Betty","Helen","Sandra","Donna","Carol","Ruth","Sharon","Michelle","Laura","Sarah","Kimberly","Deborah","Jessica","Shirley","Cynthia","Angela","Melissa","Brenda","Amy","Anna"]);return this.pick(e)},last:function(){var e=["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young","Allen"];return this.pick(e)},name:function(e){return this.first()+" "+(e?this.first()+" ":"")+this.last()},chineseName:function(e){var t="赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐".split(""),n="贵福生龙元全国胜学祥才发武新利清飞彬富顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博绍功松善厚庆磊民友裕河哲江超浩亮政谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏月莺媛艳瑞凡佳嘉琼勤珍贞莉桂娣叶璧璐娅琦晶妍茜秋珊莎锦黛青倩婷姣婉娴瑾颖露瑶怡婵雁蓓".split("");"number"!=typeof e&&(e=Math.random()>.66?2:3);for(var r=this.pick(t),a="",o=0;e>o;o++)a+=this.pick(n);return r+a}}),e.extend({url:function(){return"http://"+this.domain()+"/"+this.word()},domain:function(e){return this.word()+"."+(e||this.tld())},email:function(e){return this.character("lower")+"."+this.last().toLowerCase()+"@"+this.last().toLowerCase()+"."+this.tld()},ip:function(){return this.natural(0,255)+"."+this.natural(0,255)+"."+this.natural(0,255)+"."+this.natural(0,255)},tlds:["com","org","edu","gov","co.uk","net","io"],tld:function(){return this.pick(this.tlds)}}),e.extend({areas:["东北","华北","华东","华中","华南","西南","西北"],area:function(){return this.pick(this.areas)},regions:["110000 北京市","120000 天津市","130000 河北省","140000 山西省","150000 内蒙古自治区","210000 辽宁省","220000 吉林省","230000 黑龙江省","310000 上海市","320000 江苏省","330000 浙江省","340000 安徽省","350000 福建省","360000 江西省","370000 山东省","410000 河南省","420000 湖北省","430000 湖南省","440000 广东省","450000 广西壮族自治区","460000 海南省","500000 重庆市","510000 四川省","520000 贵州省","530000 云南省","540000 西藏自治区","610000 陕西省","620000 甘肃省","630000 青海省","640000 宁夏回族自治区","650000 新疆维吾尔自治区","650000 新疆维吾尔自治区","710000 台湾省","810000 香港特别行政区","820000 澳门特别行政区"],region:function(){return this.pick(this.regions).split(" ")[1]},address:function(){},city:function(){},phone:function(){},areacode:function(){},street:function(){},street_suffixes:function(){},street_suffix:function(){},states:function(){},state:function(){},zip:function(e){for(var t="",n=0;(e||6)>n;n++)t+=this.natural(0,9);return t}}),e.extend({todo:function(){return"todo"}}),e.extend({d4:function(){return this.natural(1,4)},d6:function(){return this.natural(1,6)},d8:function(){return this.natural(1,8)},d12:function(){return this.natural(1,12)},d20:function(){return this.natural(1,20)},d100:function(){return this.natural(1,100)},guid:function(){var e="ABCDEF1234567890",t=this.string(e,8)+"-"+this.string(e,4)+"-"+this.string(e,4)+"-"+this.string(e,4)+"-"+this.string(e,12);return t},id:function(){var e,t=0,n=["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],r=["1","0","X","9","8","7","6","5","4","3","2"];e=this.pick(this.regions).split(" ")[0]+this.date("yyyyMMdd")+this.string("number",3);for(var a=0;a<e.length;a++)t+=e[a]*n[a];return e+=r[t%11]},autoIncrementInteger:0,increment:function(e){return this.autoIncrementInteger+=+e||1},inc:function(e){return this.increment(e)}}),e}(),rkey=/(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,rrange=/([\+\-]?\d+)-?([\+\-]?\d+)?/,rplaceholder=/\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g;Mock.extend=Util.extend,Mock.mock=function(e,t,n){return 1===arguments.length?Handle.gen(e):(2===arguments.length&&(n=t,t=undefined),Mock._mocked[e+(t||"")]={rurl:e,rtype:t,template:n},Mock)};var Handle={extend:Util.extend};Handle.rule=function(e){e=(e||"")+"";var t=(e||"").match(rkey),n=t&&t[3]&&t[3].match(rrange),r=n&&parseInt(n[1],10),a=n&&parseInt(n[2],10),o=n?!n[2]&&parseInt(n[1],10)||Random.integer(r,a):1,i=t&&t[4]&&t[4].match(rrange),s=i&&parseInt(i[1],10),l=i&&parseInt(i[2],10),u=i?!i[2]&&parseInt(i[1],10)||Random.integer(s,l):0,c=t&&t[4];return{parameters:t,range:n,min:r,max:a,count:o,decimal:i,dmin:s,dmax:l,dcount:u,point:c}},Handle.gen=function(e,t,n){t=t=(t||"")+"",n=n||{},n={path:n.path||[],templatePath:n.templatePath||[],currentContext:n.currentContext,templateCurrentContext:n.templateCurrentContext||e,root:n.root,templateRoot:n.templateRoot};var r=Handle.rule(t),a=Util.type(e);return Handle[a]?Handle[a]({type:a,template:e,name:t,parsedName:t?t.replace(rkey,"$1"):t,rule:r,context:n}):e},Handle.extend({array:function(e){var t,n,r=[];if(e.rule.parameters)if(1===e.rule.count&&e.template.length>1)e.context.path.push(e.name),r=Random.pick(Handle.gen(e.template,undefined,{currentContext:r,templateCurrentContext:e.template,path:e.context.path})),e.context.path.pop();else for(t=0;t<e.rule.count;t++){n=0;do r.push(Handle.gen(e.template[n++]));while(n<e.template.length)}else for(t=0;t<e.template.length;t++)e.context.path.push(t),r.push(Handle.gen(e.template[t],t,{currentContext:r,templateCurrentContext:e.template,path:e.context.path})),e.context.path.pop();return r},object:function(e){var t,n,r,a,o,i,s={};if(e.rule.min)for(t=Util.keys(e.template),t=Random.shuffle(t),t=t.slice(0,e.rule.count),i=0;i<t.length;i++)r=t[i],a=r.replace(rkey,"$1"),e.context.path.push(a),s[a]=Handle.gen(e.template[r],r,{currentContext:s,templateCurrentContext:e.template,path:e.context.path}),e.context.path.pop();else{t=[],n=[];for(r in e.template)("function"==typeof e.template[r]?n:t).push(r);for(t=t.concat(n),i=0;i<t.length;i++)r=t[i],a=r.replace(rkey,"$1"),e.context.path.push(a),s[a]=Handle.gen(e.template[r],r,{currentContext:s,templateCurrentContext:e.template,path:e.context.path}),e.context.path.pop(),o=r.match(rkey),o&&o[2]&&"number"===Util.type(e.template[r])&&(e.template[r]+=parseInt(o[2],10))}return s},number:function(e){var t,n,r;if(e.rule.point){for(e.template+="",n=e.template.split("."),n[0]=e.rule.range?e.rule.count:n[0],n[1]=(n[1]||"").slice(0,e.rule.dcount),r=0;n[1].length<e.rule.dcount;r++)n[1]+=Random.character("number");t=parseFloat(n.join("."),10)}else t=e.rule.range&&!e.rule.parameters[2]?e.rule.count:e.template;return t},"boolean":function(e){var t;return t=e.rule.parameters?Random.bool(e.rule.min,e.rule.max,e.template):e.template},string:function(e){var t,n,r,a,o="";if(e.template.length){for(t=0;t<e.rule.count;t++)o+=e.template;for(n=o.match(rplaceholder)||[],t=0;t<n.length;t++)if(r=n[t],/^\\/.test(r))n.splice(t--,1);else{if(a=Handle.placeholder(r,e.context.currentContext,e.context.templateCurrentContext),1===n.length&&r===o&&typeof a!=typeof o){o=a;break}o=o.replace(r,a)}}else o=e.rule.range?Random.string(e.rule.count):e.template;return o},"function":function(e){return e.template.call(e.context.currentContext)}}),Handle.extend({_all:function(){var e={};for(var t in Random)e[t.toLowerCase()]=t;return e},placeholder:function(placeholder,obj,templateContext){rplaceholder.exec("");var parts=rplaceholder.exec(placeholder),key=parts&&parts[1],lkey=key&&key.toLowerCase(),okey=this._all()[lkey],params=parts&&parts[2]||"";try{params=eval("(function(){ return [].splice.call(arguments, 0 ) })("+params+")")}catch(error){params=parts[2].split(/,\s*/)}if(obj&&key in obj)return obj[key];if(templateContext&&"object"==typeof templateContext&&key in templateContext&&placeholder!==templateContext[key])return templateContext[key]=Handle.gen(templateContext[key],key,{currentContext:obj,templateCurrentContext:templateContext}),templateContext[key];if(!(key in Random||lkey in Random||okey in Random))return placeholder;for(var i=0;i<params.length;i++)rplaceholder.exec(""),rplaceholder.test(params[i])&&(params[i]=Handle.placeholder(params[i],obj));var handle=Random[key]||Random[lkey]||Random[okey];switch(Util.type(handle)){case"array":return Random.pick(handle);case"function":var re=handle.apply(Random,params);return re===undefined&&(re=""),re}}}),Mock.mockjax=function(e){function t(){return{readyState:4,status:200,statusText:"",open:e.noop,send:function(){this.onload&&this.onload()},setRequestHeader:e.noop,getAllResponseHeaders:e.noop,getResponseHeader:e.noop,statusCode:e.noop,abort:e.noop}}function n(e,n,r){var a=find(e);return a&&(e.dataFilter=e.converters["text json"]=e.converters["text jsonp"]=e.converters["text script"]=e.converters["script json"]=function(){return convert(a,e)},e.xhr=t,"script"!==n.dataType)?"json":void 0}return e.ajaxPrefilter("json jsonp script",n),Mock},"undefined"!=typeof jQuery&&Mock.mockjax(jQuery),"undefined"!=typeof Zepto&&(Mock.mockjax=function(e){var t=e.ajax,n={readyState:4,responseText:"",responseXML:null,state:2,status:200,statusText:"success",timeoutTimer:null};e.ajax=function(r){var a=find(r);if(a){var o=Mock.mock(a.template);return r.success&&r.success(o,n,r),r.complete&&r.complete(n.status,n,r),n}return t.call(e,r)}},Mock.mockjax(Zepto)),"undefined"!=typeof KISSY&&KISSY.add&&(Mock.mockjax=function(e){var t=e.io,n={readyState:4,responseText:"",responseXML:null,state:2,status:200,statusText:"success",timeoutTimer:null};e.io=function(e){var r=find(e);if(r){var a=Mock.mock(r.template);return e.success&&e.success(a,n,e),e.complete&&e.complete(n.status,n,e),n}return t.apply(this,arguments)};for(var r in t)e.io[r]=t[r]}),Mock.Util=Util,Mock.Random=Random,Mock.heredoc=Util.heredoc,"object"==typeof module&&module.exports?module.exports=Mock:"function"==typeof define&&define.amd?(define("mock",[],function(){return Mock}),define("mockjs",[],function(){return Mock})):"function"==typeof define&&define.cmd&&define(function(){return Mock}),this.Mock=Mock,this.Random=Random,"undefined"!=typeof KISSY&&Util.each(["mock","components/mock/","mock/dist/mock","gallery/Mock/0.1.9/"],function(e){KISSY.add(e,function(e){return Mock.mockjax(e),Mock},{requires:["ajax"]})}),function(e){var t={version:"0.0.1"};this.Mock||(module.exports=t),Mock.tpl=function(e,n,r,a){return t.mock(e,n,r,a)},Mock.parse=function(e){return Handlebars.parse(e)},t.mock=function(e,t,r,a){return r=r?Util.extend({},r,Handlebars.helpers):Handlebars.helpers,a=a?Util.extend({},a,Handlebars.partials):Handlebars.partials,n.gen(e,null,t,r,a)};var n={debug:t.debug||!1,extend:Util.extend};n.gen=function(e,r,a,o,i){if(Util.isString(e)){var s=Handlebars.parse(e);a=n.parseOptions(e,a);var l=n.gen(s,r,a,o,i);return l}if(r=r||[{}],a=a||{},this[e.type]!==Util.noop){a.__path=a.__path||[],(t.debug||n.debug)&&(console.log(),console.group("["+e.type+"]",JSON.stringify(e)),console.log("[options]",a.__path.length,JSON.stringify(a)));var u=a.__path.length;return this[e.type](e,r,a,o,i),a.__path.splice(u),(t.debug||n.debug)&&console.groupEnd(),r[r.length-1]}},n.parseOptions=function(e,t){var n,r,a,o=/<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g,i=e.match(o),s={};for(n=0;i&&n<i.length;n++)o.lastIndex=0,r=o.exec(i[n]),r&&(a=new Function("return "+r[1]),a=a(),Util.extend(s,a));return Util.extend(s,t)},n.val=function(r,a,o,i){if(r!==a.__path[a.__path.length-1])throw new Error(r+"!=="+a.__path);if((t.debug||n.debug)&&console.log("[options]",r,a.__path),i!==e&&(i=Mock.mock(i)),a){var s=Mock.mock(a);if(Util.isString(s))return s;if(r in s)return s[r]}return Util.isArray(o[0])?{}:i!==e?i:r||Random.word()},n.program=function(e,t,n,r,a){for(var o=0;o<e.statements.length;o++)this.gen(e.statements[o],t,n,r,a)},n.mustache=function(e,t,n,r,a){var o,i=t[0],s=t.length;if("array"===Util.type(i)&&(i.push({}),i=i[i.length-1],t.unshift(i)),e.isHelper||r&&r[e.id.string]){if(0===e.params.length);else for(o=0;o<e.params.length;o++)this.gen(e.params[o],t,n,r,a);e.hash&&this.gen(e.hash,t,n,r,a)}else this.gen(e.id,t,n,r,a);t.length>s&&t.splice(0,t.length-s)},n.block=function(e,t,n,a,o){var i,s,l,u,c,p=e.mustache.id.parts,h=t[0],f=t.length;if(e.inverse,e.mustache.isHelper||a&&a[e.mustache.id.string])c=p[0],u=(r[c]||r.custom).apply(this,arguments),h=t[0];else for(i=0;i<p.length;i++)n.__path.push(p[i]),l=p[i],u=this.val(l,n,t,{}),h[l]=Util.isArray(u)&&[]||u,c=Util.type(h[l]),("object"===c||"array"===c)&&(h=h[l],t.unshift(h));if(e.program)if("array"===Util.type(h))for(s=u.length||Random.integer(3,7),i=0;s>i;i++)h.push("undefined"!=typeof u[i]?u[i]:{}),n.__path.push("[]"),t.unshift(h[h.length-1]),this.gen(e.program,t,n,a,o),n.__path.pop(),t.shift();else this.gen(e.program,t,n,a,o);t.length>f&&t.splice(0,t.length-f)},n.hash=function(e,t,n,r,a){var o,i,s,l=e.pairs;for(i=0;i<l.length;i++)for(o=l[i],s=1;s<o.length;s++)this.gen(o[s],t,n,r,a)},n.ID=function(e,t,n){var r,a,o,i,s,l,u,c,p,h=e.parts,f=t[e.depth],d=t.length;if(Util.isArray(f)&&(f=t[e.depth+1]),h.length)for(r=0,a=h.length;a>r;r++)n.__path.push(h[r]),o=h[r],i=h[r-1],p=n[i],s=r===a-1?f[o]:{},l=this.val(o,n,t,s),u=Util.type(f[o]),c=Util.type(l),"undefined"===u?f[o]=a-1>r&&"object"!==c&&"array"!==c?{}:Util.isArray(l)&&[]||l:a-1>r&&"object"!==u&&"array"!==u&&(f[o]=Util.isArray(l)&&[]||{}),u=Util.type(f[o]),("object"===u||"array"===u)&&(f=f[o],t.unshift(f));t.length>d&&t.splice(0,t.length-d)},n.partial=function(e,t,r,a,o){var i=e.partialName.name,s=o&&o[i],l=t.length;s&&n.gen(s,t,r,a,o),t.length>l&&t.splice(0,t.length-l)},n.content=Util.noop,n.PARTIAL_NAME=Util.noop,n.DATA=Util.noop,n.STRING=Util.noop,n.INTEGER=Util.noop,n.BOOLEAN=Util.noop,n.comment=Util.noop;var r={};r.each=function(e,t,n){var r,a,o,i,s,l,u,c=t[0];for(s=e.mustache.params[0].parts,r=0,a=s.length;a>r;r++)n.__path.push(s[r]),o=s[r],l=r===a-1?[]:{},i=this.val(o,n,t,l),c[o]=Util.isArray(i)&&[]||i,u=Util.type(c[o]),("object"===u||"array"===u)&&(c=c[o],t.unshift(c));return i},r["if"]=r.unless=function(e,t,n){var r,a,o,i,s,l,u,c=e.mustache.params,p=t[0];for(r=0;r<c.length;r++)for(s=c[r].parts,a=0;a<s.length;a++)0===r&&n.__path.push(s[a]),o=s[a],l=a===s.length-1?"@BOOL(2,1,true)":{},i=this.val(o,n,t,l),a===s.length-1&&(i="true"===i?!0:"false"===i?!1:i),p[o]=Util.isArray(i)?[]:i,u=Util.type(p[o]),("object"===u||"array"===u)&&(p=p[o],t.unshift(p));return i},r["with"]=function(e,t,n){var r,a,o,i,s,l=t[0];for(i=e.mustache.params[0].parts,r=0;r<i.length;r++)n.__path.push(i[r]),a=i[r],s={},o=this.val(a,n,t,s),l=l[a]=o,t.unshift(l);return o},r.log=function(){},r.custom=function(e,t,n){var r,a,o,i,s,l,u,c=t[0];if(0!==e.mustache.params.length){for(s=e.mustache.params[0].parts,r=0,a=s.length;a>r;r++)n.__path.push(s[r]),o=s[r],l=r===a-1?[]:{},i=this.val(o,n,t,l),c[o]=Util.isArray(i)&&[]||i,u=Util.type(c[o]),("object"===u||"array"===u)&&(c=c[o],t.unshift(c));return i}}}.call(this),function(e){if("undefined"!=typeof KISSY){var t,n={debug:!1};KISSY.use("xtemplate",function(e,n){t=n}),this.Mock||(module.exports=n),Mock.xtpl=function(e,t,r,a){return n.mock(e,t,r,a)},Mock.xparse=function(e){return t.compiler.parse(e)},n.mock=function(e,n,r,a){return r=r?Util.extend({},r,t.RunTime.commands):t.RunTime.commands,a=a?Util.extend({},a,t.RunTime.subTpls):t.RunTime.subTpls,this.gen(e,null,n,r,a,{})},n.parse=function(e){return t.compiler.parse(e)},n.gen=function(e,t,r,a,o,i){if("string"==typeof e){n.debug&&console.log("[tpl    ]\n",e);var s=this.parse(e);r=this.parseOptions(e,r);var l=this.gen(s,t,r,a,o,i);return l}if(t=t||[{}],r=r||{},e.type=e.type,this[e.type]!==Util.noop){r.__path=r.__path||[],n.debug&&(console.log(),console.group("["+e.type+"]",JSON.stringify(e)),console.log("[context]","[before]",t.length,JSON.stringify(t)),console.log("[options]","[before]",r.__path.length,JSON.stringify(r)),console.log("[other  ]","[before]",JSON.stringify(i)));var u=r.__path.length;return this[e.type](e,t,r,a,o,i),n.debug&&console.log("[__path ]","[after ]",r.__path),(!i.hold||"function"==typeof i.hold&&!i.hold(e,r,t))&&r.__path.splice(u),n.debug&&(console.log("[context]","[after ]",t.length,JSON.stringify(t)),console.groupEnd()),t[t.length-1]}},n.parseOptions=function(e,t){var n,r,a,o=/<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g,i=e.match(o),s={};for(n=0;i&&n<i.length;n++)o.lastIndex=0,r=o.exec(i[n]),r&&(a=new Function("return "+r[1]),a=a(),Util.extend(s,a));return Util.extend(s,t)},n.parseVal=function(e,t){function n(e,t){if("object"==typeof t&&e in t)return[t[e]];for(var n=[],r=0;r<t.length;r++)n.push.apply(n,a(e,[t[r]]));return n}function r(e,t){if("object"==typeof t&&e in t)return[t[e]];var n=[];for(var r in t)n.push.apply(n,a(e,[t[r]]));return n}function a(e,t){for(var a=[],o=0;o<t.length;o++)"object"==typeof t[o]&&(e in t[o]?a.push(t[o][e]):a.push.apply(a,Util.isArray(t[o])?n(e,t[o]):r(e,t[o])));return a}function o(e,t){for(var n="string"==typeof e?e.split("."):e.slice(0),r=[t];n.length;)r=a(n.shift(),r);return r}return o(e,t)},n.val=function(t,r,a,o){if(t!==r.__path[r.__path.length-1])throw new Error(t+"!=="+r.__path);if(o!==e&&(o=Mock.mock(o)),r){var i=Mock.mock(r);if(Util.isString(i))return i;var s=n.parseVal(r.__path,i);if(s.length>0)return s[0];if(t in i)return i[t]}return Util.isArray(a[0])?{}:o!==e?o:t},n.program=function(e,t,n,r,a,o){for(var i=0;i<e.statements.length;i++)this.gen(e.statements[i],t,n,r,a,o);for(var s=0;e.inverse&&s<e.inverse.length;s++)this.gen(e.inverse[s],t,n,r,a,o)},n.block=function(t,n,r,a,o,i){var s=n.length;this.gen(t.tpl,n,r,a,o,Util.extend({},i,{def:{},hold:!0}));var l,u,c,p=n[0];if("array"===Util.type(p))for(l=this.val(r.__path[r.__path.length-1],r,n),c=l&&l.length||Random.integer(3,7),u=0;c>u;u++)p.push(l&&l[u]!==e?l[u]:{}),r.__path.push(u),n.unshift(p[p.length-1]),this.gen(t.program,n,r,a,o,i),r.__path.pop(),n.shift();else this.gen(t.program,n,r,a,o,i);(!i.hold||"function"==typeof i.hold&&!i.hold(t,r,n))&&n.splice(0,n.length-s)},n.tpl=function(e,t,n,r,a,o){if(e.params&&e.params.length){o=Util.extend({},o,{def:{each:[],"if":"@BOOL(2,1,true)",unless:"@BOOL(2,1,false)","with":{}}[e.path.string],hold:{each:!0,"if":function(e,t,n,r,a){return"object"==typeof a},unless:function(e,t,n,r,a){return"object"==typeof a},"with":!0,include:!1}[e.path.string]});for(var i,s=0;s<e.params.length;s++)i="include"===e.path.string?a&&a[e.params[s].value]:e.params[s],i&&this.gen(i,t,n,r,a,o);e.hash&&this.gen(e.hash,t,n,r,a,o)}else this.gen(e.path,t,n,r,a,o)},n.tplExpression=function(e,t,n,r,a,o){this.gen(e.expression,t,n,r,a,o)},n.content=Util.noop,n.unaryExpression=Util.noop,n.multiplicativeExpression=n.additiveExpression=function(t,n,r,a,o,i){this.gen(t.op1,n,r,a,o,Util.extend({},i,{def:function(){return"number"===t.op2.type?t.op2.value.indexOf(".")>-1?Random["float"](-Math.pow(10,10),Math.pow(10,10),1,Math.pow(10,6)):Random.integer():e}()})),this.gen(t.op2,n,r,a,o,Util.extend({},i,{def:function(){return"number"===t.op1.type?t.op1.value.indexOf(".")>-1?Random["float"](-Math.pow(10,10),Math.pow(10,10),1,Math.pow(10,6)):Random.integer():e}()}))},n.relationalExpression=function(e,t,n,r,a,o){this.gen(e.op1,t,n,r,a,o),this.gen(e.op2,t,n,r,a,o)},n.equalityExpression=Util.noop,n.conditionalAndExpression=Util.noop,n.conditionalOrExpression=Util.noop,n.string=Util.noop,n.number=Util.noop,n["boolean"]=Util.noop,n.hash=function(e,t,n,r,a,o){var i,s=e.value;for(i in s)this.gen(s[i],t,n,r,a,o)},n.id=function(t,r,a,o,i,s){function l(e,t,n,r,a){var o=Util.type(e[r]),i=Util.type(a);return a="true"===a?!0:"false"===a?!1:a,"undefined"===o?e[r]=n-1>t&&!Util.isObjectOrArray(a)?{}:Util.isArray(a)&&[]||a:n-1>t&&"object"!==o&&"array"!==o?e[r]=Util.isArray(a)&&[]||{}:"object"!==o&&"array"!==o&&"object"!==i&&"array"!==i&&(e[r]=a),e[r]}var u,c,p,h,f,d=r.length,m=t.parts,g=r[t.depth];for(Util.isArray(g)&&(g=r[t.depth+1]),u=0,c=m.length;c>u;u++)(0!==u||"this"!==m[u])&&(/^(xindex|xcount|xkey)$/.test(m[u])||0===u&&1===c&&m[u]in o||(a.__path.push(m[u]),p=m[u],h=u===c-1?s.def!==e?s.def:r[0][p]:{},f=this.val(p,a,r,h),n.debug&&(console.log("[def    ]",JSON.stringify(h)),console.log("[val    ]",JSON.stringify(f))),f=l(g,u,c,p,f),Util.isObjectOrArray(g[p])&&r.unshift(g=g[p])));(!s.hold||"function"==typeof s.hold&&!s.hold(t,a,r,p,f))&&r.splice(0,r.length-d)}}}.call(this)}).call(this);