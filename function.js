var t_auto;

function   timetostr(nS)   {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").replace(/\//g, "-").replace(/上午/g, " ").replace(/下午/g, " ").replace(/  /g, " ");
}

function strtotime(str_time){
    var new_str = str_time.replace(/:/g,'-');
    new_str = new_str.replace(/ /g,'-');
    new_str = new_str.replace(/\//g,'-');
    var arr = new_str.split("-");
    var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return datum.getTime()/1000;
}

//timestamp2datetime
$(document).on('click', '#btn_ts', function(){
        clearInterval(t_auto);
        $('#chk_auto').prop('checked', false);
        $('#inp_dt').val( timetostr($('#inp_ts').val()) );
});
$(document).on('keypress', '#inp_ts', function(event){
        if (event.keyCode == 13) {
                $('#btn_ts').trigger('click');
        }
});

//datetime2timestamp
$(document).on('click', '#btn_dt', function(){
        clearInterval(t_auto);
        $('#chk_auto').prop('checked', false);
        var dt = $('#inp_dt').val();
        $('#inp_ts').val( strtotime(dt) );
});
$(document).on('keypress', '#inp_dt', function(event){
        if (event.keyCode == 13) {
                $('#btn_dt').trigger('click');
        }
});

function auto_time(){
        var dt = new Date().toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").replace(/\//g, "-").replace(/上午/g, " ").replace(/下午/g, " ").replace(/  /g, " "); ;
        $('#inp_dt').val( dt );
        $('#inp_ts').val( strtotime(dt) );
        //$("#btn_dt").trigger('click');
}
auto_time();

t_auto = setInterval(auto_time, 1000);
$(document).on('click', '#chk_auto', function(){
        if ( $('#chk_auto').prop('checked') ) {
                t_auto = setInterval(auto_time, 1000);
        }
        else{
                t_auto = clearInterval(t_auto);
        }
});

///////////////////////////////////////////////////////////
$(document).ready(function(){
    $(".tab").hide();
    $("#tab1").show();
});

//切换主标签
$(document).on("click", "#headers span",function(){
    var $id = $(this).data("id");
    $("#headers span").removeClass("active");
    $(this).addClass("active");
    $(".tab").hide();
    $("#"+$id).show();
});

chrome.tabs.getSelected(null,function(tab){
    $("#tab1 #text1").val(tab.url);
    $("#tab1 #text1").trigger('input');
});

$(document).on('input', "#tab1 #text1", function(){
    $('#qrDiv').empty().qrcode({
        text    : $(this).val(),
        width:"200",
        height:"200"
    });
})

//json解析
$(document).on('click', '#btn_json', function(){
    var obj, str, hit;
    try{
        obj = JSON.parse($('#json').val());
        str = JSON.stringify(obj, null, 4);    // 缩进4个空格
        $('#json').val(str);
        hit = '解析成功';
    }
    catch(err){
        hit = 'JSON格式无效';
    }
    finally{
        $("#jsonHit").text(hit);
    }
});

//加密
$(document).on('click', "#btn_encry", function(){
    var str ="";
    var type = $("#tab3 input[name='encry']:checked").val();
    switch(type){
        case 'AES':
            str = CryptoJS.AES.encrypt($("#tab3 #text3").val(), $("#tab3 #key3").val());
            break;
        case 'DES':
            str = CryptoJS.DES.encrypt($("#tab3 #text3").val(), $("#tab3 #key3").val());
            break;
        case 'RC4':
            str = CryptoJS.RC4.encrypt($("#tab3 #text3").val(), $("#tab3 #key3").val());
            break;
        case 'Rabbit':
            str = CryptoJS.Rabbit.encrypt($("#tab3 #text3").val(), $("#tab3 #key3").val());
            break;
        case 'TripleDes':
            str = CryptoJS.TripleDES.encrypt($("#tab3 #text3").val(), $("#tab3 #key3").val());
            break;
    }
    $("#tab3 #result3").val(str);
});

//解密
$(document).on('click', "#btn_decry", function(){
    var str;
    var type = $("#tab3 input[name='encry']:checked").val();
    switch(type){
        case 'AES':
            str = CryptoJS.AES.decrypt($("#tab3 #text3").val(), $("#tab3 #key3").val()).toString(CryptoJS.enc.Utf8);
            break;
        case 'DES':
            str = CryptoJS.DES.decrypt($("#tab3 #text3").val(), $("#tab3 #key3").val()).toString(CryptoJS.enc.Utf8);
            break;
        case 'RC4':
            str = CryptoJS.RC4.decrypt($("#tab3 #text3").val(), $("#tab3 #key3").val()).toString(CryptoJS.enc.Utf8);
            break;
        case 'Rabbit':
            str = CryptoJS.Rabbit.decrypt($("#tab3 #text3").val(), $("#tab3 #key3").val()).toString(CryptoJS.enc.Utf8);
            break;
        case 'TripleDes':
            str = CryptoJS.TripleDES.decrypt($("#tab3 #text3").val(), $("#tab3 #key3").val()).toString(CryptoJS.enc.Utf8);
            break;
    }
    $("#tab3 #result3").val(str);
});

//哈希
$(document).on('click', "#btn_hash", function(){
    var str="";
    var type = $("#tab4 input[name='hash']:checked").val();
    switch(type){
        case 'MD5':
            str = CryptoJS.MD5($("#tab4 #text4").val());
            break;
        case 'SHA1':
            str = CryptoJS.SHA1($("#tab4 #text4").val());
            break;
        case 'SHA224':
            str = CryptoJS.SHA224($("#tab4 #text4").val());
            break;
        case 'SHA256':
            str = CryptoJS.SHA256($("#tab4 #text4").val());
            break;
        case 'SHA384':
            str = CryptoJS.SHA384($("#tab4 #text4").val());
            break;
        case 'SHA512':
            str = CryptoJS.SHA512($("#tab4 #text4").val());
            break;
    }
    $("#tab4 #result4").val(str);
});

//HMac哈希
$(document).on('click', "#btn_hash5", function(){
    var str="";
    var type = $("#tab5 input[name='hash']:checked").val();
    switch(type){
        case 'HmacMD5':
            str = CryptoJS.HmacMD5($("#tab5 #text5").val(), $("#tab5 #key5").val());
            break;
        case 'HmacSHA1':
            str = CryptoJS.HmacSHA1($("#tab5 #text5").val(), $("#tab5 #key5").val());
            break;
        case 'HmacSHA224':
            str = CryptoJS.HmacSHA224($("#tab5 #text5").val(), $("#tab5 #key5").val());
            break;
        case 'HmacSHA256':
            str = CryptoJS.HmacSHA256($("#tab5 #text5").val(), $("#tab5 #key5").val());
            break;
        case 'HmacSHA384':
            str = CryptoJS.HmacSHA384($("#tab5 #text5").val(), $("#tab5 #key5").val());
            break;
        case 'HmacSHA512':
            str = CryptoJS.HmacSHA512($("#tab5 #text5").val(), $("#tab5 #key5").val());
            break;
    }
    $("#tab5 #result5").val(str);
});

//编码
$(document).on('click', "#btn_encode", function(){
    var str="";
    var type = $("#tab6 input[name='encode']:checked").val();
    switch(type){
        case 'Base64Encode':
            str=CryptoJS.enc.Utf8.parse($("#tab6 #text6").val());
            var base64=CryptoJS.enc.Base64.stringify(str);
            $("#tab6 #result6").val(base64);
            break;

        case 'Base64Decode':
            var words  = CryptoJS.enc.Base64.parse($("#tab6 #text6").val());
            $("#tab6 #result6").val(words.toString(CryptoJS.enc.Utf8));
            break;
        case 'URLEncode':
            str = encodeURIComponent($("#tab6 #text6").val());
            // str = encodeURI($("#tab6 #text6").val());
            $("#tab6 #result6").val(str);
            break;
        case 'URLDecode':
            str = decodeURIComponent($("#tab6 #text6").val());
            // str = encodeURI($("#tab6 #text6").val());
            $("#tab6 #result6").val(str);
            break;

    }
});

//翻译
$(document).on('click', "#btn_translate", function() {
    var x = $("#tab7 #text7").val();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fanyi.youdao.com/openapi.do?callback=fy&keyfrom=uhuigou&key=447537466&type=data&doctype=json&version=1.1&q="+x, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = JSON.parse( xhr.responseText );
            // console.log(resp.translation[0]);
            // var text = resp.translation[0]；
            $("#tab7 #result7").val( resp.translation[0] );
        }
    }
    xhr.send();
})