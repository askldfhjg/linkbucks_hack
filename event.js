chrome.runtime.onInstalled.addListener(function() {
	var result = ["*.tinybucks.net","*.qqc.co","*.picbucks.com","*.zff.co"];
	chrome.storage.sync.set({'css': result},function(){});
	//var createProperties = {"id":"hack", "contexts":["link","selection","editable"], "targetUrlPatterns":urls, "title":"linkbucks hack"};
	var createProperties = {"id":"hack", "contexts":["all"],"title":"Bust This Linkbucks Site"};
	chrome.contextMenus.create(createProperties);
});



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
	else if(request.close) {
		console.log(sender.tab.id);
		chrome.tabs.remove(sender.tab.id);
	}
	return true;
});
function isContain(arr,value)
{
  for(var i=0;i<arr.length;i++)
  {
     if(arr[i]==value)
      return true;
  }
  return false;
}
function onClickHandler(info, tab) {
	console.log(info.pageUrl);
	re = /^https?:\/\/([a-z0-9.]+)\/?/i;
	var t = re.exec(info.pageUrl);
	if(t != null) {
		if(t.length >= 2) {
			console.log(t[1]);
			var name = t[1].replace(/^[a-z0-9]+/i, "*");
		    chrome.storage.sync.get("css", function(obj) {
				var urls = obj["css"];
				if(!isContain(urls, name)) {
					urls.push(name);
					chrome.storage.sync.set({'css': urls},function() {
					});
				}
				alert("Add blacklist Success");
		    });
		}
	}
}
chrome.contextMenus.onClicked.addListener(onClickHandler);
