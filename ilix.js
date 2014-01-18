var re = /document.write\(unescape\(['"]([a-zA-z0-9%]+)['"]\)\)/i;
var re1 = /src=['"]([^"']+)['"]/i;
var urls = document.location.href;
if(urls != "http://ilix.in" && urls != "http://ilix.in/" && urls != "https://ilix.in/" && urls != "https://ilix.in") {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", urls, true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
	          if (xhr.readyState == 4) {
          		var x = new XMLHttpRequest();
          		x.open("GET", "http://ilix.in/encrypt.php", true);
          		//x.setRequestHeader("Cookie", response.cookie);
          		x.withCredentials = true;
          		x.onreadystatechange = function() {
          			if(x.readyState == 4) {
						console.log(x.responseText);
          				var arr = re.exec(x.responseText);
          				if(arr != null) {
          					var iframe = unescape(arr[1]);
          					console.log(iframe);
          					var ret = re1.exec(iframe);
          					console.log(ret);
          					if(ret != null) {
          						console.log(ret[1]);
          						window.open(ret[1]);
          						chrome.extension.sendMessage({close: 1, url: url}, function(response){});
          					}
          				}
          			}
          		};
          		x.send();
	          }};
	xhr.send("n=0&params=Continue");
}