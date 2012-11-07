chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	if (request.msg) {
		chrome.storage.sync.get("css", function(obj){
			console.log(obj["css"]);
			var result = obj["css"].replace(/\n/ig, "|").split('|');
			var found = false;
			for(var i = 0;i < result.length; i++) {
				var reg = result[i].replace(/\*/ig, "[a-zA-Z0-9_\-]*");
				var re = new RegExp(reg, "ig");
				if(re.exec(request.msg)) {
					found = true;
				}
			}
			if(found) {
				sendResponse({farewell: obj["css"]});
				chrome.pageAction.show(sender.tab.id);
			}
		});
	}
	return true;
});