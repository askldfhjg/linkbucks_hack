var re1 = /Lbjs.TargetUrl\s+=\s*['"]([a-zA-Z:\/.0-9_\-%?=&]+)['"];/i;
var re2 = /var\s+url\s*=\s*["']([\/a-zA-Z0-9]+)["'];/im;
var re3 = /src\s?=\s?["'](\/3market.php\?[a-zA-Z=0-9&;]+)["']/i;
var url = document.location.href;
document.addEventListener("beforeload", function(event){
    var url = event.url;
    if(url.indexOf("link.js") != -1 || url.indexOf("intermissionLink.js") != -1 || url.indexOf("view33.js") != -1)
    {
      event.preventDefault();
    }
}, true);
var xhr = new XMLHttpRequest();

chrome.storage.local.get("switch", function(obj){
  if(obj['switch'] != "off") {

    chrome.extension.sendMessage({msg: url}, function(response){
      if(response.farewell) {
        /*
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            console.log(xhr.responseText);
            var arr = re1.exec(xhr.responseText);
            if(arr != null)
            {
              var target = arr[1];
              console.log(target);
              //window.open(target);
              chrome.extension.sendMessage({close: target, url: url}, function(response){});
            }
          }
        }
        xhr.send();*/
        var scripts = document.getElementsByTagName("script");
        for(var i=0;i<scripts.length;i++) {
          scripts[i].setAttribute("src", "ddd");
        }
      }
    });
  }
});
