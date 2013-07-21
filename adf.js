var re = /url\s?=\s?["'](\/go\/[0-9a-z]+\/[0-9a-z]+)['"];/i;
var re1 = /src\s?=\s?["'](\/3market.php\?[a-z0-9=&\-_%;]+)["']\s?id=/i;
var text = document.getElementsByTagName("html");
text = text[0].innerHTML;
var arr = re.exec(text);
console.log(arr);
if(arr != null) {
	var target = arr[1];
	console.log(target);
	var ifr = re1.exec(text);
	console.log(ifr);
	if(ifr != null) {
		var url = ifr[1].replace(/&amp;/ig, "&");
		console.log(url);
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			window.open(target);
		}
		xhr.send();
	}
	//window.open(target);
	//chrome.extension.sendMessage({close: 1}, function(response){});
}