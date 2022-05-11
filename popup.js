const changeColor = document.getElementById("changeColor");

async function openEyesDrop() {

  function callPopUpBox(message, time = 1800, color = "#000000"){
    const popUpDiv = document.createElement("div");
    popUpDiv.textContent = message;
    popUpDiv.id = "popUpColorAlert";
    popUpDiv.style.cssText = `
      text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
      color:${color};
      font-family: sans-serif;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius: 20px;
      position: fixed;
      width: 200px;
      height: 60px;
      bottom: 3%;
      left:45%;
      background-color:#FFFFFF;
    `
    document.body.appendChild(popUpDiv);

    setTimeout( () => document.getElementById('popUpColorAlert').remove(), time)
  }

  if ('EyeDropper' in window) { // Browser support EyeDropper
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
      
      callPopUpBox(`Copied ${colorHexValue}`, 1800, colorHexValue);
       
    } catch (err) {
      callPopUpBox(`Error, please try again.`, 2500);
    }

  }
  else{ // Browser NOT support EyeDropper
    callPopUpBox(`Your browser is not supported. Please update your browser.`, 4000);
  }
}

// click the button to active function
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openEyesDrop,
    });

    window.close();
});