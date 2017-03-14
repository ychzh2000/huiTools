function bbaa() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64
            } else {
                if (isNaN(chr3)) {
                    enc4 = 64
                }
            }
            output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
        }
        return output
    };
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2)
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3)
            }
        }
        output = _utf8_decode(output);
        return output
    };
    _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c)
            } else {
                if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128)
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128)
                }
            }
        }
        return utftext
    };
    _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++
            } else {
                if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3
                }
            }
        }
        return string
    }
};


$("body").append(
    '<div class="ikrong-musicdownload" style="opacity: 0.4; display: block; overflow: hidden;"><div class="music-button" style="background-image:url(http://vip.ufanw.com/image/vip.png)"></div><div class="download-list" style="left: -20px; opacity: 0;"><div><ul><li id="play11">播放</li><li id="down11">下载</li></ul></div></div></div>'
), $(".ikrong-musicdownload").on("mouseover", function() {
    $(this).animate({
        opacity: 1
    }, {
        speed: "normal",
        queue: !1
    }), $(this).css("overflow", "visible"), $(this).find(
        ".download-list").animate({
        left: "60px",
        opacity: "1"
    }, {
        speed: 1500,
        queue: !1
    })
}), $(".ikrong-musicdownload").on("mouseout", function() {
    $(this).animate({
        opacity: .4
    }, {
        speed: "normal",
        queue: !1
    }), $(this).find(".download-list").animate({
        left: "-20px",
        opacity: "0"
    }, {
        speed: 1e3,
        queue: !1
    }), $(this).css("overflow", "hidden")
}), $("#play11").on("click", function() {
    var a = new bbaa;
    var b = a.encode(window.location.href);
    window.location.href = "http://vip.ufanw.com/play/play.html?url=" + b.substring(0, 3) + "1" + b.substring(3)
}), $("#down11").on("click", function() {
    var a = new Object;
    a.code = "101", a.msg = "解析失败", $.ajax({
        timeout: 5e3,
        type: "get",
        url: "http://jx.ufanw.com/VedioParser.ashx?url=" +
            window.location.href,
        data: "",
        async: !1,
        success: function(b) {
            a = JSON.parse(b), "100" == a.code ? ($("body")
                .append('<div> <a id="xiazai1" href="' +
                    a.msg + '" download=""></a></div>'),
                document.getElementById("xiazai1").click()
            ) : alert(a.msg)
        },
        error: function() {
            alert(a.msg)
        }
    })
});
