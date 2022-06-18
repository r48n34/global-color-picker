// @ts-nocheck
async function openEyesDrop(): Promise<string> {

    return new Promise( (rec, rej) => {
        if (!("EyeDropper" in window)) {
            rej("")
        }

        const eyeDropper = new EyeDropper()
        const abortController = new AbortController()

        eyeDropper.open({ signal: abortController.signal }).then( (result:any) => {
            const colorHexValue:string = result.sRGBHex

            toCopyBoard(colorHexValue);

            rec(colorHexValue)
        })
        .catch( (e:any) => {
            rej("")
        });

    })
}

function toCopyBoard(str:string){
    const textarea = document.createElement("textarea")
    textarea.textContent = str
    textarea.style.position = "fixed"
    document.body.appendChild(textarea)

    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
}

export { openEyesDrop, toCopyBoard }
