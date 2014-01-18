var re = /var\sysmm\s?=\s?["']([a-zA-Z0-9]+)["']/i;
var text = document.getElementsByTagName("html");
text = text[0].innerHTML;
var url = document.location.href;
var arr = re.exec(text);
if(arr != null) {
	var ysmm = arr[1];
	if(ysmm)
	{
		var K = '', h = '';
		for (var y = 0; y < ysmm.length; y++) {
		    if (y % 2 == 0) {
		        K += ysmm.charAt(y);
		    } else {
		        h = ysmm.charAt(y) + h;
		    }
		}
		ysmm = K + h;
		ysmm = Base64.decode(ysmm);
		ysmm = ysmm.substring(2);
		console.log(ysmm);
		window.open(ysmm);
		chrome.extension.sendMessage({close: 1, url: ysmm}, function(response){});
	}
}