if(!chrome.webNavigation.onBeforeNavigate.hasListeners()) {
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
}
