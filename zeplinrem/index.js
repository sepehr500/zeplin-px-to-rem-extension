/*jshint esversion: 6 */
let rootsize = 16;
window.onload = () => {
  chrome.storage.sync.get(["rootsize"], function(result) {
    rootsize = result.rootsize;
  });
  document.onpointermove = e => {
    findAndReplace();
  };
  document.body.addEventListener("click", findAndReplace, true);
};

//a function that loops through every single item
function findAndReplace() {
  setTimeout(() => {
    [
      ...document.querySelectorAll(
        ".layerWidth,.layerHeight,.token.number, .propertyValue.ellipsis, .value"
      )
    ].forEach(element => {
      element.childNodes.forEach(child => {
        if (child.nodeType === 3) {
          requestIdleCallback(() => {
            //The text
            let px = child.nodeValue.match(/^\d*\.?\d*px/g);
            if (px && px.length === 1) {
              let value = child.nodeValue.replace(
                new RegExp(`^\\d*\\.?\\d*px`, "g"),
                (parseInt(px.slice(-2)) / (rootsize || 16)).toFixed(2) + "rem"
              );
              child.nodeValue = value;
            }
          });
        }
      });
    });
  });
}
