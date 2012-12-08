var re1 = /Lbjs.TargetUrl\s+=\s*['"]([a-zA-Z:\/.0-9_]+)['"];/i;
var re2 = /var\s+url\s*=\s*["']([\/a-zA-Z0-9]+)["'];/im;
var re3 = /src\s?=\s?["'](\/3market.php\?[a-zA-Z=0-9&;]+)["']/i;
var url = document.location.href;
var xhr = new XMLHttpRequest();
chrome.extension.sendMessage({msg: url}, function(response){
  console.log(response.farewell);
  if(response.farewell) {
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var arr = re1.exec(xhr.responseText);
        if(arr != null)
        {
          var target = arr[1];
          console.log(target);
          window.open(target);
          chrome.extension.sendMessage({close: 1}, function(response){});
        }
      }
    }
    xhr.send();
  }
});
