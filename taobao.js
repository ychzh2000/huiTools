window.onload = setTimeout(function(){
    var url = location.href;
    if (url.indexOf("mm_31450135")<0) {
        var tag_a = document.createElement('a');
        tag_a.setAttribute("href", "http://www.uhuigou.net/Home-Index-self.html?url="+encodeURIComponent(url));
        tag_a.setAttribute("style", "background: white;color: red;font-weight: bold;font-family: 'Microsoft Yahei';");
        tag_a.innerText = "转换链接";
        var tag_div = document.createElement('div');
        tag_div.setAttribute("class", "tb-btn-buy tb-btn-sku");
        tag_div.setAttribute("style", "margin-top: 10px;float: left;border: 1px solid #ebc7ac;");
        tag_div.appendChild(tag_a);

        var buy = document.getElementsByClassName("tb-btn-buy");
        if (buy.length>0) {
            target = buy[0].parentNode;
        }
        else{
            buy = document.getElementsByClassName("tb-action");
            target = buy[0];
        }
        target.appendChild(tag_div);
    }
}, 1000);