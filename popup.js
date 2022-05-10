const changeColor = document.getElementById("changeColor");

async function openEyesDrop() {
  if ('EyeDropper' in window) {
    try {

      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
  
      const colorHexValue = result.sRGBHex;
    
      const textarea = document.createElement("textarea");
      textarea.textContent = colorHexValue;
      textarea.style.position = "fixed"; 
      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");

      document.body.removeChild(textarea);

      const popUpDiv = document.createElement("div");
      popUpDiv.textContent = `Copied ${colorHexValue}`;
      popUpDiv.id = "popUpColorAlert";
      popUpDiv.style.cssText = "color:#000000; font-family: sans-serif; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; display:flex; align-items:center; justify-content:center; border-radius: 20px; position: fixed; width: 200px; height: 60px; bottom: 3%; left:45%; background-color:#FFFFFF"
      document.body.appendChild(popUpDiv);
      setTimeout( () => document.getElementById('popUpColorAlert').remove(), 1800)

    } catch (err) {
      return;
    }

  }
  else{
    console.log("Oh no");
  }
}

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openEyesDrop,
    });

    window.close();

});