/**
 * Created by pocouser on 2015/11/18.
 */
/**
 * 基础函数类
 * 所有外接函数要求驼峰写法
 * 所有内接函数要求小写写法
 * Created by Bosco on 2015/3/12.
 */
var $ = require("./jquery1.8");
var Browser = null;
var config = window.Config;

exports.a=function(){}

/**
 * 获取覆盖层对象
 * @param option 覆盖层样式
 * @returns {*|jQuery|HTMLElement}
 * @constructor
 */
exports.GetOverDiv = function (option) {

    option = typeof(option) == "object" ? option : {};
    var overbase = $(".overbase"),use,cc_style;
    if(!option.style){
        cc_style=option;
    }
    else{
        cc_style=option.style;
    }
    if (overbase.size() < 1) {
        overbase = $("<div class='overbase'></div>");
        $("body").append(overbase);

        overbase.data("overuse",1);

        overbase.on("touchstart", function(e){
            exports.StopDefault(e);
            option.click && option.click.call  && option.click();
        });

        overbase.on("close",function(){
            use=parseInt(overbase.data("overuse"));
            use=!isNaN(use)?use:1;
            use--;
            overbase.data("overuse",use);
            if(use<1){
                overbase.remove();
            }
        })
    }
    else{
        use=parseInt(overbase.data("overuse"));
        use=!isNaN(use)?use:1;
        use++;
        overbase.data("overuse",use);
    }

    var style = {
        "width": "100%",
        "height": "100%",
        "position": "fixed",
        "left": 0,
        "top": 0,
        "background": "#000",
        "z-index": 999,
        "display": "none",
        "overflow": "hidden"
    };

    style = exports.MerageObj(style, cc_style);

    overbase.css(style);



    return overbase;
}


exports.AddLoading=function(o,option){

}


/**
 * 获取loading
 * @param o
 * @returns {*|jQuery|HTMLElement}
 * @constructor
 * @param size 尺寸
 * @param option
 * unlock:不锁定默认动作
 * fix:是否fix
 */
exports.GetLoading = function (o, size, option) {
    option = option || {};

    var baseele = o ? o : $("body");
    var loading = baseele.children(".overloading");
    if (loading.size() < 1) {
        loading = $("<div class='overloading'><i class='gp_icon'></i></div>");
        if (size == "small") {
            loading.find("i").addClass("small");
            loading.find("i").addClass("gp_icon_loading_white_20x20")
        }
        else if(size=="little"){
            loading.find("i").addClass("little");
            loading.find("i").addClass("gp_icon_loading_white_12x12")
        }
        else{
            loading.find("i").addClass("gp_icon_loading_white_40x40")
        }
        if (baseele.css("position") != "absolute" && baseele.css("position") != "fixed" && baseele.css("position") != "relative" && baseele.prop("tagName") && baseele.prop("tagName").toLowerCase() != "body")
            baseele.css("position", "relative");
        baseele.append(loading);
    }
    //fix
    if (option.fix || !o) {
        loading.css("position", "fixed");
    }
    if (!option.unlock){
        loading.on("touchstart", exports.StopDefault);
        loading.on("mousedown", exports.StopDefault);
    }
    return loading;
}

exports.CancelLoading = function (o) {
    var baseele = o ? o : $("body");
    var loading = baseele.children(".overloading");
    if (loading.size() > 0) {
        loading.remove();
    }
}

exports.HasLoading=function(o){
    var baseele = o ? o : $("body");
    var ret=false;
    var loading = baseele.children(".overloading");
    if (loading.size() > 0) {
        ret=true;
    }
    return ret;
}


/**
 * 获取JSON
 * @param str
 * @returns {boolean}
 * @constructor
 * @param errorback
 */
exports.JSONParse=function(str,errorback){
    var ret=false;
    if(!exports.isObject(str)) {
        if (JSON && JSON.parse) {
            try {
                ret = JSON.parse(str);
            }
            catch (e) {
                //console.log(e);
                ret = false;
            }
        }
        else {
            try {
                ret = eval("(" + arguments + ")");
            }
            catch (e) {
                //console.log(e);
                errorback && errorback.call && errorback();
                ret = false;
            }
        }
    }
    else{
        ret=str;
    }
    return ret;
}


exports.UploadImage=function(option){
    var option=option?option:{};
    var _fncall=option.callback?option.callback:function(){}
    if(option.file) {
        var _action = option.src ? option.src : "";
        var _target = 'UploadImage';
        var _form = $("<form enctype='multipart/form-data' method='post' action='" + _action + "' target='" + _target + "'></form>");
        var _fnname = "fileupload" + (new Date()).getTime();
        _form.append('<input type="hidden" name="pass_hash" value="82273a6ba2126d3af24ce2d0cb0af515"  />');
        _form.append('<input type="hidden" name="g_session_id" value="5acc9f5567a3b38a7b7ace59f9df6efc"/>');
        _form.append('<input type="hidden" name="is_phone" value="1"  />');
        _form.append('<input type="hidden" name="__go" value="1"  />');
        _form.append('<input type="hidden" name="callbackUrl" value="'+Config.website+'/admin/action/system_test_action.php?act=show_img/>');
        $("body").append(_form);
        if ($("#" + _target).size() < 1) {
            var _ifa = $("<iframe name='" + _target + "' id='" + _target + "'></iframe>");
            _ifa.css("display", "none");
            $("body").append(_ifa);
        }
        _form.submit();

    }
}


exports.ScrollTo=function(obj,opt){
    var t= 0,
        ast;
    if(exports.isNumber(obj)){
        t=parseInt(obj);
    }
    else if(obj && obj.offset && obj.size && obj.size()>0){
        t=obj.offset().top;
    }
    else return false;
    opt=opt || {};
    var now=$(window).scrollTop();
    var duration=opt.duration || 400;
    if(opt.dev){
        t=t+opt.dev;
    }
    if(t-now<50){
        duration=duration/10;
    }
    var pre=(t-now)/duration*20;
    var count=Math.round(duration/20);
    var n=1;
    var fn=function(){
        if(n<=count) {
            now = now + pre;
            if(n==count)now=t;
            $(window).scrollTop(now);
            n++;
            ast=setTimeout(fn, 20)
        }
    }
    fn();
    var cc_a=exports.MouseWheel($(window),function(){
        clearTimeout(ast);
        exports.MouseWheelCancel($(this),cc_a);
    })
}

/**
 * Tips 提示信息，从一个位置出来，往某个点移动
 * @param x:中心点位置left
 * @param y:中心店位置top
 * @param option:选项
 * distance:移动距离[对象的话为坐标系,对象格式为:{x:0,y:0}]
 * css :一个对象，为tips的覆盖样式
 * shirf:一个对象，其实位置的偏移值 {x:0,y:0}
 * value:string 显示内容,默认是+1
 * delay:延迟多少秒执行消失动画 默认:1s [-1的时候不消失]
 * duration:动画执行时间 默认1s
 * callback:结束以后的返回函数
 * before:触发动画额函数，也就是消失之前
 * ids:标识
 *
 * 第一个参数是obj,则获取这个obj的中心点，第二个参数则为option
 *
 */
exports.Tips = function (x, y, option) {
    //如果x为JQ对象
    if (x && x.offset) {
        option = y;
        var offset = x.offset();
        if (exports.isObject(offset) && offset.width) {
            y = offset.top + offset.height / 2;
            x = offset.left + offset.width / 2;
        }
        else if(exports.isObject(offset)){
            y = offset.top + x.outerHeight() / 2;
            x = offset.left + x.outerWidth() / 2;
        }
    }


    option = exports.isObject(option) ? option : {};

    var distance = option.distance,
        d_x, d_y,
        css = option.css,
        shirf = exports.isObject(option.shirf) ? option.shirf : {},
        value = option.value || "+1",
        delay = parseInt(option.delay),
        duration = parseInt(option.duration),
        callback = exports.isFunction(option.callback) ? option.callback : function () {
        },
        before = exports.isFunction(option.before) ? option.before : function () {
        },
        ids = option.ids || false;

    delay = !isNaN(delay) ? delay : 1000;
    duration = !isNaN(duration) ? duration : 1000;

    if (exports.isObject(distance) && distance.x && distance.y) {
        d_x = distance.x;
        d_y = distance.y;
    }
    else if (!isNaN(parseInt(distance))) {
        d_x = 0;
        d_y = parseInt(distance);
    }
    else {
        d_x = 0;
        d_y = -45;
    }

    var tips = $("<span class='base_tips'></span>");

    if (css) {
        tips.css(css);
    }

    tips.html(value);

    $("body").append(tips);

    var w0 = tips.offset().width || tips.outerWidth();
    var h0 = tips.offset().height || tips.outerHeight();

    if (w0 && h0) {
        x = x - w0 / 2;
        y = y - h0 / 2;
    }


    x = shirf.x ? x + shirf.x : x;
    y = shirf.y ? y + shirf.y : y;

    tips.css({
        left: x,
        top: y
    });

    tips.html(value);

    //消失
    var _hide = function () {
        tips.css({
            opacity: 0,
            "transform": "translate(" + d_x + "px," + d_y + "px)",
            "-webkit-transform": "translate(" + d_x + "px," + d_y + "px)",
            "transition": "all " + duration / 1000 + "s",
            "-webkit-transition": "all " + duration / 1000 + "s"
        });

        before && before.call();
        setTimeout(function () {
            tips.remove();
            tips = null;
            callback && callback.call();
        }, duration)

    }

    if (delay >= 0) {
        setTimeout(function () {
            _hide();
        }, delay);
    }
    tips.on("hide", _hide);
    if (ids) {
        tips.data("ids", ids);
    }
    return tips;
}


/**
 * 显示
 * @param msg
 * @param type 信息类型[1:失败 | 2:正确 | 3:警告]
 * @param option:选项
 * position:fix|absolute 默认fix
 * istip:使用tips的方式
 */
var msgwaiting = [];
exports.Msg = function (msg, type, option) {
    if (exports.isObject(type)) {
        option = type;
        type = option.type || 2;
    }
    else {
        option = option || {};
    }


    var position = option.position || "fixed";

    var x = $(window).width() * 0.5;
    var y = $(window).height() - 50;

    while ($.inArray(y, msgwaiting) > -1) {
        y = y - 30;
    }

    msgwaiting.push(y);
    exports.Tips(x, y, {
        css: {
            "position": position,
            "background": "rgba(000,000,000,0.5)",
            "overflow": "hidden",
            "width": "50%",
            "height": "auto",
            "color": "#fff",
            "padding": "5px",
            "border-radius": "5px",
            "box-sizing": "border-box",
            "-webkit-box-sizing": "border-box",
            "z-index": option.z_index ? option.z_index : "100001"
        },
        delay: 2000,
        value: msg,
        before: function () {
            msgwaiting.splice(0, 1);
        }
    })


}


/***
 * 图片裁剪
 * @param o 图片
 * @param opt 选项
 * @constructor
 */
exports.ImageResize = function (o, opt) {
    opt = opt || {};
    opt.callback=opt.callback || function(){}
    o = $(o);
    if (o.width && o.height) {
        var src = o.attr("src");
        if (src) {
            if (opt.loading) {
                exports.GetLoading(o.parent());
            }
            var img = new Image();
            img.onload = function () {
                if (o && o.width && o.height) {
                    var p = o.parent();
                    var w = p.width();
                    var w0 = img.width;
                    var h0 = img.height;
                    var h = h0 / w0 * w;
                    var W = p.width();
                    var H = p.height();
                    //如果是zepto，则需要计算里面的边框
                    if(!p.outerWidth) {
                        var BDW = parseInt(p.css("border-right-width")) + parseInt(p.css("border-left-width"));
                        BDW = isNaN(BDW) ? 0 : BDW;
                        W = W - BDW;
                        var BDH = parseInt(p.css("border-top-width")) + parseInt(p.css("border-top-width"));
                        BDH = isNaN(BDW) ? 0 : BDH;
                        H = H - BDH;
                        var PDW = parseInt(p.css("padding-left")) + parseInt(p.css("padding-right"));
                        PDW = isNaN(PDW) ? 0 : PDW;
                        W = W - PDW;
                        var PDH = parseInt(p.css("padding-top")) + parseInt(p.css("padding-bottom"));
                        PDH = isNaN(PDH) ? 0 : PDH;
                        H = H - PDH;
                    }

                    if(opt.showall){
                        if (h < H) {
                            var t = (H - h) / 2;
                            o.css({"margin-left": "auto", "height": "auto", "width": "100%", "margin-top": t});

                        }
                        else {
                            var hz = H;
                            var wz = w / h * H;
                            var l = (W - wz) / 2;
                            o.css({"margin-left": l, "height": "100%", "width": "auto", "margin-top": "auto"});
                        }
                    }
                    else {
                        if (h < H) {
                            var hz = H;
                            var wz = w / h * H;
                            var l = (W - wz) / 2;
                            o.css({"margin-left": l, "height": "100%", "width": "auto", "margin-top": "auto"});
                        }
                        else {
                            var t = (H - h) / 2;
                            o.css({"margin-left": "auto", "height": "auto", "width": "100%", "margin-top": t});
                        }
                    }
                    setTimeout(function(){
                        o.attr("width", "");
                        o.attr("height", "");
                    },20)
                    o.css("display", "block");
                    o.removeClass("resize");
                    if (opt.loading) {
                        exports.CancelLoading(o.parent());
                    }
                    if(!exports.Browser().ie) {
                        o.attr("width", "");
                        o.attr("height", "");
                    }
                    if(opt.callback){
                        opt.callback(true);
                    }
                }
            }
            img.onerror = function () {
                o.css("display", "none");
                if(opt.callback){
                    opt.callback(false);
                }
            }
            img.src = src;
        }
    }
}




/**
 * 滚轮事件
 * @param obj
 * @param fn
 */
exports.MouseWheel=function(obj,fn){
    fn=exports.isFunction(fn)?fn:function(){}
    var _callback=function(e){
        var evt =window.event ||e;
        var wheeldelta=evt.detail ? -evt.detail / 3 : evt.wheelDelta / 120;
        fn.call(obj,evt,wheeldelta);
    }
    if(obj && fn) {
        var mousewheelevt = (exports.Browser().moz) ? "DOMMouseScroll" : "mousewheel";
        if (document.attachEvent) //if IE (and Opera depending on user setting)
            obj.get(0).attachEvent("on" + mousewheelevt, _callback)
        else if (document.addEventListener) //WC3 browsers
            obj.get(0).addEventListener(mousewheelevt, _callback, false)
    }
    return _callback;
}

/**
 * 清除鼠标事件
 * @param obj
 * @param fn
 * @constructor
 */
exports.MouseWheelCancel=function(obj,fn){
    fn=exports.isFunction(fn)?fn:function(){}
    if(obj && fn) {
        var mousewheelevt = (exports.Browser().moz) ? "DOMMouseScroll" : "mousewheel";
        if (document.attachEvent) //if IE (and Opera depending on user setting)
            obj.get(0).detachEvent("on" + mousewheelevt, fn)
        else if (document.addEventListener) //WC3 browsers
            obj.get(0).removeEventListener(mousewheelevt, fn, false)
    }
}


/**
 * 创建队列函数
 * @returns {{}}
 * @constructor
 */
exports.Q = function () {
    var ret = {};
    ret.queue = [];
    ret.isqueue = true;
    var addqueue = function (key) {

        ret[key] = function () {
            var _arguments = arguments;
            ret.queue.push(function () {

                exports[key].apply(ret, _arguments)
            });
            return ret;
        }
    }
    addqueue("LoadJs");
    addqueue("LoadCss");
    ret.next = function () {
        var queue = ret.queue;
        if (queue.length > 0) {
            var _next = queue.splice(0, 1)[0];

            if (exports.isFunction(_next)) {
                _next.call();
            }
        }
    }
    return ret;
}

/**
 * 加载一个JS
 * @param url 地址
 * @param opt 选项 ：
 * 1：charset 字符集
 * 2:append 插入的地方选择器
 * 3:callback 返回error 和url
 * 4:timeout 超时
 * @constructor
 * @return {boolean}
 */
exports.LoadJs = function (url, opt) {
    var ret=false,ast;
    if (!this.isqueue) {
        ret = exports.Q();
    }
    else {
        ret = this;
    }


    opt = exports.isObject(opt) ? opt : {};
    var callback = exports.isFunction(opt.callback) ? opt.callback : function () {};


    var head = document.getElementsByTagName('head')[0],
        js = document.createElement('script');

    if(opt.id){
        var cc_obj=$("[data-loadjs_id="+opt.id+"]");
        if(cc_obj && cc_obj.size()>0){
            cc_obj.remove();
        }
    }

    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);
    if(opt.id){
        js.setAttribute("data-loadjs_id",opt.id);
    }
    opt.charset && js.setAttribute('charset', opt.charset);

    if (opt.append && opt.append.size && opt.append.size() > 0) {
        opt.append.append(js);
    }
    else {
        head.appendChild(js);
    }

    //执行回调
    var callbackFn = function (e, error_url) {
        clearTimeout(ast);
        if (typeof callback === 'function') {
            callback(e, error_url);
        }
        ret.next();
    };

    if (document.all) { //IE
        js.onreadystatechange = function (e) {
            //alert(url+" "+js.readyState);
            if (js.readyState === 'loaded' || js.readyState === 'complete') {
                //js.onreadystatechange = null;
                callbackFn();
            }
        }
    } else {
        js.onload = function () {
            callbackFn();
        }
        js.onerror = function (e) {
            callbackFn(e, url);
        }
    }

    if(opt.timeout){
        ast=setTimeout(function(){
            if(js.onerror){
                js.onerror();
                js.onload=function(){}
                js.onerror=function(){}
            }
        },opt.timeout)
    }
    return ret;

}

/**
 * 加载CSS
 * @param url
 * @param opt
 * 1：charset 字符集
 * 2:append 插入的地方选择器
 * 3:callback 返回error 和url
 * 4:timeout 超时
 * @returns {boolean}
 * @constructor
 */
exports.LoadCss = function (url, opt) {
    var ret=false;
    if (!this.isqueue) {
        ret = exports.Q();
    }
    else {
        ret = this;
    }


    opt = exports.isObject(opt) ? opt : {};

    var callback = function(){
        if(exports.isFunction(opt.callback)){
            opt.callback();
        }
        ret.next();
    }

    var _ast=false;
    var isload=false;//主要解决某些浏览器比如FF 出现两次loading

    var csstmp = document.createElement('link');
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(csstmp);
    csstmp.setAttribute("href", url);
    csstmp.setAttribute("type", "text/css");
    csstmp.setAttribute("rel", "stylesheet");
    opt.charset && csstmp.setAttribute("charset",opt.charset);
    csstmp.onload = function () {
        if(isload)return false;
        clearTimeout(_ast);
        isload=true;
        callback(url);
    }
    csstmp.onerror = function (e) {
        clearTimeout(_ast);
        //console.log("加载错误,css " + url + " 加载失败");
        //console.log(e);
        callback(false);
    }
    if(opt.timeout) {

        _ast = setTimeout(function () {
            csstmp.onerror();
            //csstmp.setAttribute("href", "");
            //console.log("请求: " + csstmp.getAttribute("href") + " 超时");
            csstmp.onerror = function () {
            };
            csstmp.onload = function () {
            }
            // head.removeChild(csstmp);
        }, opt.timeout);
    }

    head.appendChild(csstmp);
    return ret;
}

/**
 * 获取URL参数
 * @param str
 * @returns {*}
 * @constructor
 */
exports.GetUrl = function (str) {
    var this_str = location.href;
    var this_num = this_str.indexOf("?");
    if (this_num < 0)return false;
    var this_option = this_str.substr(this_num + 1);
    if(this_option.indexOf("#")>-1){
        this_option = this_option.substr(0,this_option.indexOf("#"));
    }
    var this_optionarr = this_option.split("&");
    var returnstr = null;
    for (this_cout = 0; this_cout < this_optionarr.length; this_cout++) {
        var this_canshu = this_optionarr[this_cout].split("=");
        if (this_canshu < 2)continue;
        if (this_canshu[0] == str)returnstr = this_canshu[1];
    }
    if (returnstr == null)return false;
    else return returnstr;
}

/**
 * 获取hash参数
 */
exports.GetHash = function (str) {
    var this_str = location.href;
    var this_num = this_str.indexOf("#");
    if (this_num < 0)return false;
    var this_option = this_str.substr(this_num + 1);
    var this_optionarr = this_option.split("&");
    var returnstr = null;
    for (this_cout = 0; this_cout < this_optionarr.length; this_cout++) {
        var this_canshu = this_optionarr[this_cout].split("=");
        if (this_canshu < 2)continue;
        if (this_canshu[0] == str)returnstr = this_canshu[1];
    }
    if (returnstr == null)return false;
    else return returnstr;
}


/**
 * hash事件管理-添加
 * ID 标识
 */
var hash_array = {};
exports.SetHash = function (id, fn) {
    hash_array[id] = fn;
}

exports.UnsetHash = function (id) {
    hash_array[id] = null;
}

window.onhashchange = function () {
    $.each(hash_array, function (i, item) {
        if (exports.isFunction(item)) {
            item.call();
        }
    })
}


/**
 * 将obj2 覆盖 obj1
 * @param obj1
 * @param obj2
 * @returns {*}返回一个新对象
 */
exports.MerageObj = function (obj1, obj2) {
    for (var p in obj2) {
        try {
            if (typeof(obj2[p]) == "object") {
                obj1[p] = exports.MerageObj(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}

/**
 * 给O_base 赋默认值
 * @param O_base
 * @param O_default
 * @constructor
 */
exports.MerageObjByDefault=function(O_base,O_default) {
    for (var x in O_default) {
        if(O_default.hasOwnProperty(x)) {
            var item = O_default[x];
            if(typeof(O_base[x]) == "undefined"){
                O_base[x] = item;
            }
            else if(exports.isObject(item) && exports.isObject(O_base[x])){
                exports.MerageObjByDefault(O_base[x],item);
            }
        }
    }
}

/**
 * 判断参数arr是否数组
 * @param o 参数
 */
exports.isArray = function (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

exports.isFunction = function (arg) {
    return typeof arg === 'function';
}

exports.isString = function (arg) {
    return typeof arg === 'string';
}



/**
 * [Object_hasAttr object是否为空对象]
 * @param {[type]} obj [description]
 */
exports.Object_hasAttr=function(obj)
{
    var hasAttr=false;
    var obj=obj
    if(exports.isObject(obj))
    {
        for(key in obj)
        {
            hasAttr=true;
        }
    }
    else
    {
        return "not a object";
    }
    return hasAttr;
}

/**
 * 是否对象
 * @param arg
 * @returns {boolean}
 */
exports.isObject = function (arg) {
    return typeof arg === 'object' && arg !== null;
}

/**
 * 是否数字
 * @param arg
 * @returns {boolean}
 */

exports.isNumber = function (arg) {
    return typeof arg === 'number';
}

exports.isString = function (arg) {
    return typeof(arg) === "string";
}

/**
 * 禁止默认动作
 * @param e
 * @returns {boolean}
 * @constructor
 */
exports.StopDefault = function (e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    else {
        window.event.returnValue = false;
    }
    return false;
}

/**
 * 禁止冒泡
 * @param e
 * @constructor
 */
exports.StopMaoPao = function (e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}


/**
 * 获取对象长度
 * @param o
 * @returns {number}
 * @constructor
 */
exports.ObjectLength = function (o) {
    var i = 0;
    $.each(o, function () {
        i++;
    })
    return i;
}

/**
 * 删除对象第一个元素
 * @param o
 * @returns {*}
 * @constructor
 */
exports.Objectshirf = function (o) {
    var n = 0;
    var ret = null;
    $.each(o, function (i) {
        if (n++ == 0) {
            ret = o[i];
            delete o[i];

        }
    })
    return ret;
}

/**
 * 清除左右两边空格
 * @returns {*}
 * @constructor
 */
exports.Trim = function (str) {
    return exports.isString(str) ? str.replace(/(^\s*)|(\s*$)/g, "") : str;
}

/**
 * 清除左边空格
 * @returns {*}
 * @constructor
 */
exports.Ltrim = function (str) {
    return exports.isString(str) ? str.replace(/(^\s*)/g, "") : str;
}

/**
 * 清除右边空格
 * @returns {*}
 * @constructor
 */
exports.Rtrim = function (str) {
    return exports.isString(str) ? str.replace(/(\s*$)/g, "") : str;
}





/**
 * 设置Storage
 * @param key key值
 * @param str objcet=>string string=>string
 * @param type 类型 1:local 2:session 默认1
 * @constructor
 * @return {boolean||null}
 */
exports.SetVar = function (key, str, type) {
    key = exports.isString(key) ? key : "";
    if (exports.isString(str) || str === null || str === false || str === true) {
        //str=str;
    }
    else if (exports.isObject(str)) {
        str = JSON.stringify(str);
    }
    else {
        str = "";
    }
    if (key && (str || str === null || str === false )) {
        if (localStorage && localStorage.setItem) {
            type = type || 1;
            if (type == 1 || !(sessionStorage && sessionStorage.setItem)) {
                localStorage.setItem(key, str);
            }
            else {
                sessionStorage.setItem(key, str);
            }
            return true;
        }
        else {
            //console.log("不支持本地储存");
            return false;
        }
    }
    else {
        return null;
    }
}

/**
 *
 * @param key key值
 * @param type 类型 1:local 2:session 默认1
 * @returns {*}
 * @constructor
 */
exports.GetVar = function (key, type) {
    key = exports.isString(key) ? key : "";
    if (key) {
        if (localStorage && localStorage.getItem) {
            type = type || 1;
            var ret = "";
            if (type == 1 || !(sessionStorage && sessionStorage.getItem)) {
                ret = localStorage.getItem(key);
            }
            else {
                ret = sessionStorage.getItem(key);
            }
            if(ret=="null" || ret =="false"){
                ret=null;
            }
            return ret;
        }
        else {
            //console.log("不支持本地储存");
            return false;
        }
    }
    else {
        return null;
    }
}

/**
 * 继承类
 * @param model 原类
 * @param opt 新类 【construct】
 * @returns {Function}
 * @constructor
 */
exports.ExtendClass = function(model,opt){
    if(!model || !model.call)return function(){};
    opt = opt || {};
    var construct = opt["construct"] || function(){};
    var ret = {};
    var NewClass=function(){
        var self=this;
        opt = opt || {};
        model.apply(self,arguments);
        construct && construct.call && construct.apply(self,arguments);
    }
    for(var x in model.prototype){
        NewClass.prototype[x] = model.prototype[x];
    }
    for(var x in opt){
        if(opt.hasOwnProperty(x) && opt[x] && opt[x].call){
            NewClass.prototype[x]=opt[x];
        }
    }
    return NewClass;
}

/**
 * 分析URL
 * @param url
 * @returns {{source: *, protocol: string, host: string, port: (*|string|Function), query: (*|string), params, file: *, hash: string, path: string, relative: *, segments: Array, link: *, params_sort: Function, toUrl: Function}}
 * @constructor
 */
exports.ParseURL = function(url){
    var a =  document.createElement('a');
    a.href = url;
    var cc_fn=function(){
        var ret = {},
            seg = a.search.replace(/^\?/,'').split('&'),
            len = seg.length, i = 0, s;
        for (;i<len;i++) {
            if (!seg[i]) { continue; }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
        }
        return ret;
    }
    var cc_obj=cc_fn();
    var cc_ret = {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: cc_obj,
        params_change:function(key,value){
            cc_obj[key]=value;
            return this;
        },
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        pathname:function(){return (cc_ret.toUrl().match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1];},
        segments: a.pathname.replace(/^\//,'').split('/'),
        set:function (key, value) {
            if($.inArray(key,["host","hostname","port"])>-1){
                a[key]=value;
                cc_ret.host = a.host;
                cc_ret.port = a.port;
            }
        },
        link:a.href.split("?")[0],
        params_sort:function(){
            var cc_new_obj = {};
            var cc_new_arr = [];
            $.each(cc_obj,function(i,item){
                if(item){
                    cc_new_arr.push(i);
                }
            })
            cc_new_arr.sort();
            $.each(cc_new_arr,function(i,item){
                cc_new_obj[item] = cc_obj[item];
            })
            cc_ret.params = cc_obj = cc_new_obj;
        },
        clear_hash:function () {
            a.href = a.href.split("#")[0];
            return this;
        },
        toPath:function (sort) {
            var ret=a.href.split("?")[0];
            ret=ret+"?";
            sort && cc_ret.params_sort();
            $.each(cc_obj,function(i,item){
                if(item){
                    ret+=i+"="+item+"&";
                }
            })
            if(ret.substr(ret.length-1)==="&"){
                ret = ret.substr(0,ret.length-1);
            }
            if(ret.substr(ret.length-1)==="?"){
                ret = ret.substr(0,ret.length-1);
            }
            ret = (ret.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1];
            return ret;
        },
        toUrl:function(sort){
            var ret=a.href.split("?")[0];
            ret=ret+"?";
            sort && cc_ret.params_sort();
            $.each(cc_obj,function(i,item){
                if(item){
                    ret+=i+"="+item+"&";
                }
            })
            if(ret.substr(ret.length-1)==="&"){
                ret = ret.substr(0,ret.length-1);
            }
            if(ret.substr(ret.length-1)==="?"){
                ret = ret.substr(0,ret.length-1);
            }
            return ret;
        }
    };
    return cc_ret;
}


/**
 * 通过时间戳获取时间格式
 * @param str
 * @constructor
 * @param format
 * @return {string}
 */
exports.GetTime=function(str,format){
    str=parseInt(str);
    var D=false;
    if(isNaN(str)){
        D=new Date();
    }
    else{
        D=new Date(str);
    }
    var ret="";
    if(D && !isNaN(D.getTime())){
        var fullyear=D.getFullYear();
        var month=D.getMonth()+1;
        var date=D.getDate();
        var hours= D.getHours();
        var minute= D.getMinutes();
        var second= D.getSeconds();
        var doublemonth=month>9?month:"0"+month;
        var doubledate=date>9?date:"0"+date;
        var doubleyear=fullyear.toString().substr(2);
        var doublehours=hours>9?hours:"0"+hours;
        var doubleminues=minute>9?minute:"0"+minute;
        var doublesecond=second>9?second:"0"+second;
        ret=format;
        ret=ret.replace(/YYYY/g,fullyear);
        ret=ret.replace(/YY/g,doubleyear);
        ret=ret.replace(/mm/g,doublemonth);
        ret=ret.replace(/m/g,month);
        ret=ret.replace(/dd/g,doubledate);
        ret=ret.replace(/d/g,date);
        ret=ret.replace(/hh/g,doublehours);
        ret=ret.replace(/h/g,hours);
        ret=ret.replace(/ii/g,doubleminues);
        ret=ret.replace(/i/g,minute);
        ret=ret.replace(/ss/g,doublesecond);
        ret=ret.replace(/s/g,second);
    }
    return ret;
}

/**
 * 预加载切换图片
 * @param src {object}  图片地址
 * @param opt {object} 选项
 * callback|errorback|timeout[20000ms]|loading[obj]
 * @constructor
 * @return {object}
 */
exports.SetImgSrc=function(src,opt){
    if(!src)return false;
    opt=exports.isObject(opt)?opt:{};
    opt.timeout=opt.timeout || 200000;
    opt.loading=opt.loading || false;
    opt.debug=opt.debug || 0;
    var ast=false;
    if(opt.loading && opt.loading.size()>0){
        exports.GetLoading(opt.loading,opt.loading_type);
    }
    var _newimg=new Image();
    _newimg.onload=function(){
        clearTimeout(ast);
        setTimeout(function() {
            opt.callback && opt.callback.call && opt.callback.call(_newimg);
            exports.CancelLoading(opt.loading);
        },opt.debug);
    }
    _newimg.onerror=function(){
        opt.errorback && opt.errorback.call && opt.errorback.call(_newimg);
        if(_newimg && _newimg.onload)_newimg.onload=null;
        _newimg=null;
        exports.CancelLoading(opt.loading);
    }
    ast=setTimeout(function(){
        _newimg.onerror();
    },opt.timeout);
    _newimg.src=src;
}


/**
 * 获取浏览器类型
 * @returns {*} 返回一个对象。【
 * ipad|iphoneOs|midp|uc|uc7|uc|android|ce|winphone 手机浏览器类型
 * ie5|ie6|ie7|ie8|ie9|ie10|ie11|moz|webkit|opera|safari PC浏览器类型
 * mob:是否手机端
 * pc:是否PC端
 * iosversion:IOS版本
 * 】
 * @constructor
 */
exports.Browser = function () {
    if (Browser)return Browser;
    else {
        Browser = Ghost_Pig_Browser_fn();

        return Browser;
    }
}
//获取浏览器版本
var Ghost_Pig_Browser_fn = function () {
    var _fn = function () {
        var ret = {};
        var sUserAgent = navigator.userAgent.toLowerCase();
        ret.ipad = sUserAgent.match(/ipad/i) == "ipad";
        ret.ipod = sUserAgent.match(/ipod/i) == "ipod";
        ret.iphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        ret.midp = sUserAgent.match(/midp/i) == "midp";
        ret.uc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        ret.uc = sUserAgent.match(/ucweb/i) == "ucweb";
        ret.qq = /qqbrowser/i.test(sUserAgent);
        ret.android = sUserAgent.match(/android/i) == "android";
        ret.is360 = /360 aphone browser/i.test(sUserAgent) || /360browser/i.test(sUserAgent);
        ret.chrome = /chrome/i.test(sUserAgent)
        ret.ce = sUserAgent.match(/windows ce/i) == "windows ce";
        ret.winphone = sUserAgent.match(/windows mobile/i) == "windows mobile";
        ret.isweixin = sUserAgent.match(/MicroMessenger/i) == "micromessenger";
        if (ret.ipad || ret.iphoneOs || ret.ipod) {
            ret.ios = true;
        }
        if (!(ret.ipad || ret.iphoneOs || ret.midp || ret.uc7 || ret.uc || ret.android || ret.ce || ret.winphone)) {
            return false;
        }
        else {
            if (navigator.userAgent.toLowerCase().match(/applewebkit\/([\d.]+)/).length > 1) {
                var _v = parseFloat(navigator.userAgent.toLowerCase().match(/applewebkit\/([\d.]+)/)[1]);
                _v = !isNaN(_v) ? _v : null;
                if (_v < 534 && !ret.uc)ret.isandroidbrowser = true;
            }
            return ret;
        }

    }

    var _iosfn = function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var ret = null;
        var reg = /OS [1-9]_\d[_\d]* like Mac OS X/i;
        var vreg = /\d+/g;
        var iosstr = sUserAgent.match(reg);
        if (iosstr && iosstr.length) {
            var ver = iosstr[0].match(vreg)
            if (ver) {
                ver = ver.join(".");
                ret = ver;
            }
        }
        return ret;

    }

    var _android = function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var ret = null;
        var reg = /android (\d+.)+\d/g;
        var vreg = /\d/g;
        var androidstr = sUserAgent.match(reg);
        if (androidstr && androidstr.length) {
            var ver = androidstr[0].match(vreg)
            if (ver) {
                ver = ver.join(".");
                ret = ver;
            }
        }
        return ret;
    }

    var _weixin_version = function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var ret = null;
        var reg = /MicroMessenger\/([\d\.]+)/i;
        var str = sUserAgent.match(reg);
        if (str && str.length > 1) {
            str = str[1];
            ret = str;
        }
        return ret;
    }

    var _versionfn = function (str) {
        var _ret = 0;
        try {
            var _ver = parseFloat(navigator.userAgent.toLowerCase().match(str)[1]);
            if (isNaN(_ver))_ret = 0;
            else _ret = _ver;
        } catch (e) {
            _ret = 0;
        }
        return _ret;
    }
    var ret = {}
    var _fna = function (obj) {
        obj = obj ? obj : {};
        if (obj.moz)return "Mozilla";
        if (obj.webkit)return "WebKit";
        if (obj.opera)return "Opera";
        if (obj.ie11)return "Internet Explorer 11";
        if (obj.ie10)return "Internet Explorer 10";
        if (obj.ie9)return "Internet Explorer 9";
        if (obj.ie8)return "Internet Explorer 8";
        if (obj.ie7)return "Internet Explorer 7";
        if (obj.ie6)return "Internet Explorer 6";
        if (obj.ie5)return "Internet Explorer 5";
        if (obj.ipad)return "Ipad";
        if (obj.iphoneOs)return "Iphone";
        if (obj.midp)return "Midp";
        if (obj.uc7 || obj.uc)return "Uc browser";
        if (obj.android)return "Android Browser";
        if (obj.cs)return "Window CE";
        if (obj.winphone)return "Window Moblie";
    }
    var mobile = _fn();
    if (mobile) {
        ret = mobile;

        ret.pc = false;
        ret.mob = true;
        ret.iosversion = _iosfn();
        ret.androidversion = _android();
        if (ret.isweixin) {
            ret.weixin_version = _weixin_version();
        }
    }
    else {
        var nav = navigator.userAgent.toLowerCase();
        var pc = {};
        pc.version = 0;
        pc.moz = /firefox/.test(nav);
        pc.webkit = /webkit/.test(nav);
        pc.opera = /opera/.test(nav);
        pc.safari = /safari/.test(nav);
        if (pc.moz) {
            pc.version = _versionfn(/firefox\/([\d.]+)/);
        }
        else if (pc.webkit) {
            pc.version = _versionfn(/chrome\/([\d.]+)/);
        }
        else if (pc.opera) {
            pc.version = _versionfn(/opera\/([\d.]+)/);
        }
        pc.ie = /msie/.test(nav);
        pc.ie11 = false;
        pc.ie10 = false;
        pc.ie9 = false;
        pc.ie8 = false;
        pc.ie7 = false;
        pc.ie6 = false;
        pc.ie5 = false;
        if (pc.ie) {
            var _ver = nav.match(/msie ([\d.]+)/)[1];

            if (_ver == "11.0")pc.ie11 = true;
            else if (_ver == "11.0")pc.ie11 = true;
            else if (_ver == "10.0")pc.ie10 = true;
            else if (_ver == "9.0")pc.ie9 = true;
            else if (_ver == "8.0")pc.ie8 = true;
            else if (_ver == "7.0")pc.ie7 = true;
            else if (_ver == "6.0")pc.ie6 = true;
            else pc.ie5 = true;
            var _vs = parseInt(_ver);
            if (!isNaN(_vs))pc.version = _vs;
        }
        ret = pc;
        ret.mob = false;
        ret.pc = true;
        ret.version = pc.version;
    }
    ret.tostring = _fna(ret);
    return ret;
}

