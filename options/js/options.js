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
        chrome.storage.sync.set({'css': urls},function() {
          reflushText();
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
  $( ".button" ).button();
  $( "#tabs" ).tabs();
  document.getElementById("add").addEventListener("click",saveChanges,false);
  document.getElementById("delete").addEventListener("click",deleteUrl,false);
  reflushText();
});