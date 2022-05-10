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

      Swal.fire({
        position: 'bottom',
        html: `
        <h5 style="margin:0; font-size: 8px;">Success to copy in clipboard.</h5>
        <h5 style="margin:0; font-size: 8px; text-shadow: 2px 2px 3px rgba(0,0,0,0.4); color:${colorHexValue};">${colorHexValue}</h5>
        `,
        showConfirmButton: false,
        backdrop: false,
        timer: 1500,
        width: "14rem",
        padding:"1rem"
      })
      
      document.body.removeChild(textarea);

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Can not use here.",
      })
      return;
    }
    finally{
      document.body.removeChild(textarea);
    }

  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your browser is not support EyeDropper. See https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API for more informations.',
    })
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