let color = '#3aa757';
const changeColor = document.getElementById("changeColor");
const copyColor = document.getElementById("copyColor");
const colorDisplayBox = document.getElementById("colorDisplayBox");

async function openEyesDrop() {
  if ('EyeDropper' in window) {
    try {

      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
  
      const colorHexValue = result.sRGBHex;
      console.log(colorHexValue);
      
      const textarea = document.createElement("textarea");
      textarea.textContent = colorHexValue;
      textarea.style.position = "fixed"; 

      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");

      Swal.fire({
        position: 'bottom',
        html: `
        <h5 style="margin:0; font-size: 8px;">Success to copy</h5>
        <h5 style="margin:0; font-size: 8px; color:${colorHexValue};">${colorHexValue}</h5>
        `,
        showConfirmButton: false,
        backdrop: false,
        timer: 1500,
        width: "14rem",
        padding:"1rem"
      })
      
      document.body.removeChild(textarea);
      
      

    } catch (err) {
      console.log(err);
      return;
    }
    finally{
      document.body.removeChild(textarea);
    }

  }
  else{
    throw new Error("Browser not support this function.");
  }
}

// console.log(colorDisplayBox);

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openEyesDrop,
    });

    window.close();

});


// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

