import { toast } from "react-hot-toast";

// @ts-nocheck
async function openEyesDrop(): Promise<string> {
  return new Promise((rec, rej) => {
    if (!("EyeDropper" in window)) {
      rej("");
    }

    const eyeDropper = new EyeDropper();
    const abortController = new AbortController();

    eyeDropper.open({ signal: abortController.signal }).then((result: any) => {
      const colorHexValue: string = result.sRGBHex;

      toCopyBoard(colorHexValue);

      rec(colorHexValue);
    })
      .catch((e: any) => {
        rej("");
      });
  });
}

function toCopyBoard(str: string) {
  const textarea = document.createElement("textarea");
  textarea.textContent = str;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  toast.success("Color Copied to clipboard!")
}

function randomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function hexToRgb(hex: string) {
  hex = hex.replace("#", "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r},${g},${b})`;
}

function hexToHSL(hex: string) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    let cssString = '';
    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } 
    else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    cssString = h + ',' + s + '%,' + l + '%';
    cssString = 'hsl(' + cssString + ')';
    
    return cssString;
}

export { hexToRgb, openEyesDrop, randomHexColor, toCopyBoard, hexToHSL };
