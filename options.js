function saveChanges() 
{
  // 获取表单中保存的值。
  textarea = document.getElementById("text");
  var theValue = textarea.value;
  console.log(theValue);
  // 确保包含代码
  if (theValue) {
    chrome.storage.sync.set({'css': theValue});
  }
}
var btn = document.getElementById("save");
btn.addEventListener("click",saveChanges,false);
chrome.storage.sync.get("css", function(obj){
  console.log(obj["css"]);
  document.getElementById("text").value = obj["css"];
});