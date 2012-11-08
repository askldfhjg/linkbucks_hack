function saveChanges() 
{
  // 获取表单中保存的值。
  textarea = document.getElementById("text");
  var theValue = textarea.value;
  console.log(theValue);
  // 确保包含代码
  if (theValue) {
    theValue = theValue.replace(/\n/ig, "|").split('|');
    var urls = [];
    for(var i = 0;i < theValue.length; i++) {
      if(theValue[i].length > 0) {
        urls.push(theValue[i]);
      }
    }
    console.log(urls);
    chrome.storage.sync.set({'css': urls},function(){
      reflushText();
      var u =[];
      for(var i = 0;i < urls.length; i++) {
        u.push("*://"+urls[i]+"/*");
      }
      chrome.contextMenus.update("hack", {"targetUrlPatterns":u});
    });
  }
}
var btn = document.getElementById("save");
btn.addEventListener("click",saveChanges,false);
reflushText();

function reflushText() {
  chrome.storage.sync.get("css", function(obj){
  console.log(obj["css"]);
  var inf = "";
  if(typeof(obj["css"]) == 'object') {
    for(var i = 0;i < obj["css"].length; i++) {
      if(inf.length <= 0) {
        inf = obj["css"][i] + "\n";
      }
      else {
        inf = inf + obj["css"][i] + "\n";
      }
    }
  }
  document.getElementById("text").value = inf;
  });
}