var re1 = /Lbjs.TargetUrl\s+=\s*['"]([a-zA-Z:\/.0-9_]+)['"];/i;
var re2 = /var\s+url\s*=\s*["']([\/a-zA-Z0-9]+)["'];/im;
var re3 = /src\s?=\s?["'](\/3market.php\?[a-zA-Z=0-9&;]+)["']/i;
var url = document.location.href;
chrome.extension.sendMessage({msg: url}, function(response){
  console.log(response.farewell);
  if(response.farewell) {

    var text = document.getElementsByTagName("html");
    text = text[0].innerHTML;
    if(window.location.hostname == "adf.ly") {
      var arr = re2.exec(text);
      if(arr != null) {
        var target = arr[1];
        target = "http://adf.ly" + target;
        console.log(target);
        var iframe = re3.exec(text);
        iframe = iframe[1].replace(/&amp;/g, "&");
        console.log(iframe);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", iframe, true);
        xhr.onreadystatechange = function() {
          console.log(xhr.responseText);
          window.open(target);
          //chrome.extension.sendMessage({close: 1}, function(response){});
        };
        xhr.send();
      }
    }
    else {
      var arr = re1.exec(text);
      if(arr != null) {
        var target = arr[1];
        console.log(target);
        //var body = document.getElementsByTagName("body");
        //body = body[0];
        //var div = document.createElement("div");
        //div.setAttribute("style", "position:fixed;width:200px;height:200px;background-color:black;top: 0px;");
        //div.setAttribute("onclick","alert('" +target +" ')");
        //body.appendChild(div);
        window.open(target);
        chrome.extension.sendMessage({close: 1}, function(response){});
      }
    }
    /*
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var arr = re1.exec(xhr.responseText);
        if(arr != null)
        {
          var target = arr[1];
          console.log(target);
          //var body = document.getElementsByTagName("body");
          //body = body[0];
          //var div = document.createElement("div");
          //div.setAttribute("style", "position:fixed;width:200px;height:200px;background-color:black;top: 0px;");
          //div.setAttribute("onclick","alert('" +target +" ')");
          //body.appendChild(div);
          window.open(target);
        }
      }
    }
    xhr.send();*/
  }
});
