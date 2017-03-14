function retry(){
    var meta = document.getElementsByTagName("meta");
    var str,userid,p1,p2;
    for (var i=0; i<meta.length; i++) {
        if(meta[i].name == "microscope-data"){
            str = meta[i].content;
            str = str.toLowerCase();
            p1 = str.indexOf("userid=");
            p2 = str.indexOf(";", p1);
            if (p1>=0 && p2==-1) {
                p2 = str.length;
            }
            if (p1>=0 && p2>p1) {
                n++;
                if (n<60) {
                    setTimeout("retry()", n*500);
                }
                userid = str.substr(p1+7, p2-p1-7);
                var tag_a = document.createElement('a');
                tag_a.setAttribute("href", "http://www.uhuigou.net/Home-Index-self_shop?sellerid="+userid);
                tag_a.setAttribute("class", "uhg_shop");
                var tag_img = document.createElement('img');
                tag_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA7klEQVR42qSSYW3EMAxGX6YSCIVQ6EFYIfQgbBBKYQfhBuFKoRBaCBuFQPB+7MvJypJt0lmyrNqu+/m5wfjVZsW11zBUjb0BPVuDFOydhqiYO/VTcCs8uxf+WiEDG4AfsAOf8mKj4uFySX4CeOJBG6rno1KQGgqyy/8YMHcgpv8oWAXGK1gULw70C/BaGgrEpXGBFsSoAQcwAXnoKMtSEsu5nG1ScgMmDDCIBrvBqDi73FU9ST4aLKrfz7joqzXtSTEK8FXKZq1CsO/iB3CWvJuob40LvQvoCLwB5wIxOfoFVGxwudSwgpk99Cd+DQB2kUsTDCKLGQAAAABJRU5ErkJggg==";
                tag_a.appendChild(tag_img);
                var classes = new Array( "slogo-extraicon","seller", "hook", "tm-3c-shopInfo");
                for (item in classes) {
                    var divs = document.getElementsByClassName(classes[item]);
                    for (var j=0; j<divs.length; j++) {
                        if(divs[j].getElementsByClassName("uhg_shop").length>0)
                            continue;
                        divs[j].appendChild(tag_a.cloneNode(true));
                    }
                }
            }
            else{
                return;
            }
        }
    }
}

var n = 0;
setTimeout("retry()",1000);

str = document.getElementsByClassName("slogo-extraicon")[0];
str.setAttribute("style", "width:95px");
