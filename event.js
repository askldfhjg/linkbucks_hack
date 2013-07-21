var blacklist = ["*.tinybucks.net",
				"*.qqc.co",
				"*.picbucks.com",
				"*.zff.co",
				"*.allanalpass.com",
				"*.linkbucks.com",
				"*.ultrafiles.net",
				"*.theseblogs.com",];

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.get("css", function(obj) {
		var result = obj['css'];
		if(obj['css'] == null || obj['css'].length <= 0) {
			result = [];
		}
		for(i=0;i<blacklist.length;i++) {
			if(!isContain(result, blacklist[i])) {
				result.push(blacklist[i]);
			}
		}
		chrome.storage.sync.set({'css': result},function(){});
	});
	//var createProperties = {"id":"hack", "contexts":["link","selection","editable"], "targetUrlPatterns":urls, "title":"linkbucks hack"};
	var createProperties = {"id":"hack", "contexts":["all"],"title":"Bust This Linkbucks Site"};
	chrome.contextMenus.create(createProperties);
	chrome.storage.local.set({'switch': "on"},function(){});
	chrome.storage.local.set({'share': "on"},function(){});
	chrome.browserAction.setBadgeText({"text":"ON"});
	chrome.browserAction.setBadgeBackgroundColor({"color":"#578bcc"});
	chrome.tabs.create({url: "options/new.html?tab=tutortal"});
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
		if(request.url.indexOf("locked") == -1)
		{
			chrome.tabs.update(sender.tab.id, {url: request.close});
		}
		//chrome.tabs.update(sender.tab.id, {url: request.close});
		//chrome.tabs.remove(sender.tab.id);
		console.log(request.close);
		console.log(request.url);
		//chrome.tabs.create({url: request.close});
	}/*
	else if(request.cookie) {
		var cook = '';
		chrome.cookies.getAll({url: "http://ilix.in"}, function(ray) {
			for(i=0;i<ray.length;i++) {
				if(i != 0) {
					cook += " ";
				}
				cook += ray[i].name+"="+ray[i].value;
				if(i != ray.length - 1) {
					cook += ";";
				}
			}
			console.log(cook);
			sendResponse({cookie: cook});
		});
	}*/
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
					_gaq.push(['_trackEvent', 'Blacklist', "menu", name]);
				}
				alert("Add blacklist Success");
		    });
		}
	}
}
chrome.contextMenus.onClicked.addListener(onClickHandler);
