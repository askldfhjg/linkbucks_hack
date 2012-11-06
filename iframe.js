var re = /Lbjs.TargetUrl\s+=\s*['"]([a-zA-Z:\/.0-9_]+)['"];/i
var url = document.location.href;
chrome.extension.sendMessage({msg: "data"}, function(response){
  console.log("eee");
  console.log(response.farewell);return;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var arr = re.exec(xhr.responseText);
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
  xhr.send();
});
