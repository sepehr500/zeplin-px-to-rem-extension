let rootsizeTextBox = document.getElementById("rootsize");
chrome.storage.sync.get(["rootsize"], function(result) {
  rootsizeTextBox.value = result.rootsize || 16;
});

document.getElementById("savesettings").onclick = function() {
  const val = rootsizeTextBox.value;
  chrome.storage.sync.set({ rootsize: val }, function() {
    document.getElementById("savesettings").innerHTML = "Settings Saved";
  });
};
