import { useState } from "react"
import { Button, ColorPicker, Group, Space } from '@mantine/core';
import { useStorage } from '@plasmohq/storage';
import { openEyesDrop } from "~utilis/utilis";
import { Ballpen } from 'tabler-icons-react';
import TextAndCopy from "./TextAndCopyComp";
import toast, { Toaster } from "react-hot-toast";

export function Main({ name = "Global color picker" }) {

    if (typeof window === 'undefined') { 
        return (<></>)
    } 

    const [ colorCode, setColorCode ] = useState<string>("");
    const [ colorArrStore, setColorArrStore ] = useStorage<string[]>("colorArrStore", (storedVal) =>
        typeof storedVal === "undefined" ? [] : storedVal
    )

    return (
        <>
        <Toaster />
        <div style={{ display: "flex", flexDirection: "column", padding: 8 }}>
            <TextAndCopy colorCode={colorCode} setColorArrStore={setColorArrStore}/>

            <Group position="center" direction="column">
                <ColorPicker value={colorCode} onChange={setColorCode} size="xs" swatches={colorArrStore}/>
            </Group>
            <Space h="xs" />

            <Button
                leftIcon={<Ballpen size={16} />}
                onClick={ async () => {
                    try{
                        let res = await openEyesDrop();
                        setColorCode(res);
                        setColorArrStore([...colorArrStore, res]);
                        toast.success('Copied to clipboard')
                    }
                    catch(err:any){
                        toast.error('Fail to Copied')
                        // later
                    }
                }}
            >
                Pick Color
            </Button>
        </div>
        </>
    )
}
