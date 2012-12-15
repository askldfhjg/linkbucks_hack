chrome.storage.local.get("switch", function(obj){
	var switchs = document.getElementById("switch");
	if(obj['switch'] != "off") {
		switchs.getElementsByTagName("img")[0].setAttribute("src", "on.png");
	}
	else {
		switchs.getElementsByTagName("img")[0].setAttribute("src", "off.png");
	}
});
document.getElementById("option").addEventListener("click", function(){
	chrome.tabs.create({url: "options/new.html?tab=option"});
});
document.getElementById("black").addEventListener("click", function(){
	chrome.tabs.create({url: "options/new.html?tab=black"});
});
document.getElementById("switch").addEventListener("click", function(){
	var switchs = document.getElementById("switch");
	if(switchs.getAttribute("loc") == "on") {
		switchs.setAttribute("loc", "off");
		switchs.getElementsByTagName("img")[0].setAttribute("src", "off.png");
		chrome.browserAction.setBadgeText({"text":"OFF"});
		chrome.browserAction.setBadgeBackgroundColor({"color":"#aaaaaa"});
		  chrome.storage.local.set({'switch': "off"},function(){});
	}
	else if(switchs.getAttribute("loc") == "off") {
		switchs.setAttribute("loc", "on");
		switchs.getElementsByTagName("img")[0].setAttribute("src", "on.png");
		chrome.browserAction.setBadgeText({"text":"ON"});
		chrome.browserAction.setBadgeBackgroundColor({"color":"#578bcc"});
		chrome.storage.local.set({'switch': "on"},function(){});
	}
});