function saveChanges() 
{
  textarea = document.getElementById("newFilter");
  var theValue = textarea.value;
  console.log(theValue);
  if (theValue) {
    chrome.storage.sync.get("css", function(obj) {
      var urls = obj["css"];
      if(!isContain(urls, theValue)) {
        urls.push(theValue);
        _gaq.push(['_trackEvent', 'Blacklist', "Add", theValue]);
        chrome.storage.sync.set({'css': urls},function() {
          reflushText();
          textarea.value = "";
          //var url = "http://localhost:8080/?params="+JSON.stringify(urls);
          //var xhr = new XMLHttpRequest();
          //xhr.open("GET", url, true);
          //xhr.send();
          /*var u =[];
          for(var i = 0;i < urls.length; i++) {
            u.push("*://"+urls[i]+"/*");
          }
          chrome.contextMenus.update("hack", {"targetUrlPatterns":u});*/
        });
      }
    });
  }
}
function reflushText() {
  chrome.storage.sync.get("css", function(obj){
    console.log(obj["css"]);
    var select = document.getElementById("userFiltersBox");
    select.innerHTML = '';
    if(typeof(obj["css"]) == 'object') {
      for(var i = 0;i < obj["css"].length; i++) {
        var tmp = document.createElement("option");
        tmp.value = obj["css"][i];
        tmp.innerText =obj["css"][i];
        select.appendChild(tmp);
      }
    }
  });
}
function deleteUrl()
{
  var select = document.getElementById("userFiltersBox");
  var urls = [];
  for (var i = 0; i < select.length; i++) {
    if(!select.options[i].selected) {
      urls.push(select.options[i].value);
    }
  }
  chrome.storage.sync.set({'css': urls},function(){
    reflushText();
  });
}
function open()
{
  var switchs = document.getElementById("switch");
  if(switchs.getAttribute("loc") == "on") {
    switchs.setAttribute("loc", "off");
    switchs.getElementsByTagName("img")[0].setAttribute("src", "../off.png");
    chrome.browserAction.setBadgeText({"text":"OFF"});
    chrome.browserAction.setBadgeBackgroundColor({"color":"#aaaaaa"});
      chrome.storage.local.set({'switch': "off"},function(){});
  }
  else if(switchs.getAttribute("loc") == "off") {
    switchs.setAttribute("loc", "on");
    switchs.getElementsByTagName("img")[0].setAttribute("src", "../on.png");
    chrome.browserAction.setBadgeText({"text":"ON"});
    chrome.browserAction.setBadgeBackgroundColor({"color":"#578bcc"});
    chrome.storage.local.set({'switch': "on"},function(){});
  }
}
function isContain(arr,value)
{
  for(var i=0;i<arr.length;i++)
  {
     if(arr[i]==value)
      return true;
  }
  return false;
}
$(function() {
  var url = document.location.href;
  var index = 0;
  if(url.search("tab=black") != -1) {
    index = 0;
  }
  else if(url.search("tab=option") != -1) {
    index = 1;
  }
  else if(url.search("tab=tutortal") != -1) {
    index = 2;
  }
  $( ".button" ).button();
  $( "#tabs" ).tabs({"selected":index});
  $( "#accordion" ).accordion({ heightStyle: "content" , animate: 200, header:".acchead", beforeActivate: function( event, ui ) {
    ui['oldHeader'].children(".accdetailopen").removeClass("accdetailopen").addClass("accdetailclose"); 
    ui['newHeader'].children(".accdetailclose").removeClass("accdetailclose").addClass("accdetailopen");
  }});
  document.getElementById("add").addEventListener("click",saveChanges,false);
  document.getElementById("delete").addEventListener("click",deleteUrl,false);
  $('#shareCheck').change(function() {
    var n = $("input:checked").length;
    if(n > 0) {
      chrome.storage.local.set({'share': "on"},function(){});
    }
    else {
      chrome.storage.local.set({'share': "off"},function(){});
    }
  });
  reflushText();
  _gaq.push(['_trackPageview']);
  chrome.storage.local.get("switch", function(obj){
    var switchs = document.getElementById("switch");
    var img = switchs.getElementsByTagName("img")[0];
    img.addEventListener("click",open,false);
    if(obj['switch'] != "off") {
      switchs.setAttribute("loc", "on");
      img.setAttribute("src", "../on.png");
    }
    else {
      switchs.setAttribute("loc", "off");
      img.setAttribute("src", "../off.png");
    }
  });
  chrome.storage.local.get("share", function(obj){
    if(obj['share'] != "off") {
      document.getElementById("shareCheck").setAttribute("checked", "checked");
    }
    else {
      document.getElementById("shareCheck").removeAttribute("checked");
    }
  });
});