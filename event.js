chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	if (request.msg) {
		chrome.storage.sync.get("css", function(obj){
			console.log(obj["css"]);
			if(typeof(obj["css"]) != "object") {
				var result = [];
			}
			else
			{
				var result = obj["css"];
			}
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


chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.get("css", function(obj){
		console.log(obj["css"]);
		if(typeof(obj["css"]) != "object") {
			var result = [];
		}
		else
		{
			var result = obj["css"];
		}
		var urls = [];
		for(var i = 0;i < result.length; i++) {
			urls.push("*://"+result[i]+"/*");
		}
		var createProperties = {"id":"hack", "contexts":["link","selection","editable"], "targetUrlPatterns":urls, "title":"linkbucks hack"};
		//var createProperties = {"id":"hack", "contexts":["link","selection","editable"],"title":"linkbucks hack"};
		chrome.contextMenus.create(createProperties);
	});
});

function onClickHandler(info, tab) {
	console.log(info);
}
chrome.contextMenus.onClicked.addListener(onClickHandler);
