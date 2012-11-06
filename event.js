/*if(!chrome.webNavigation.onBeforeNavigate.hasListeners()) {
	chrome.webNavigation.onBeforeNavigate.addListener(function(detail){
		console.log(detail);
		chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
			if (request.msg == "data") {
				chrome.storage.sync.get("css", function(obj){
					console.log(obj["css"]);
					sendResponse({farewell: obj["css"]});
					return true;
				});
			}
			else {
				sendResponse({});
				return true;
			}
			return true;
		});
	});
}*/
chrome.storage.sync.get("css", function(obj){
	console.log(obj["css"]);
	//sendResponse({farewell: obj["css"]});
	//return true;
	var result = obj["css"].replace("\n", "|").split('|');
	var urls = [];
	for(var i = 0;i < result.length; i++) {
		urls.push("*://"+result[i]+"/*");
	}
	console.log(urls);
	chrome.webRequest.onBeforeRequest.addListener(function(detail){
		console.log(detail);
		if(detail.method == "GET") {
			var url = detail.url;
			console.log(url);
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					var re = /Lbjs.TargetUrl\s+=\s*['"]([a-zA-Z:\/.0-9_]+)['"];/i
					var arr = re.exec(xhr.responseText);
					console.log(arr);
					if(arr != null) {
						var target = arr[1];
						console.log(target);
						chrome.tabs.create({"url":target,"openerTabId":detail.tabId});
					}
					//return {"redirectUrl":"http://php.net/"};
				}
			};
			xhr.send();
		}
		//return {"redirectUrl":"http://baidu.com"};
	}, {"urls":urls, "types":["main_frame"]})
});
