import { useState } from "react"
import { Button, ColorPicker, Group, Space } from '@mantine/core';
import { useStorage } from '@plasmohq/storage';
import { openEyesDrop } from "~utilis/utilis";
import { Ballpen } from 'tabler-icons-react';
import TextAndCopy from "./TextAndCopyComp";

export function Main({ name = "Extension yo" }) {

    if (typeof window === 'undefined') { 
        return (<></>)
    } 

    const [ colorCode, setColorCode ] = useState<string>("");
    const [ colorArrStore, setColorArrStore ] = useStorage<string[]>("colorArrStore", (storedVal) =>
        typeof storedVal === "undefined" ? [] : storedVal
    )

    return (
        <div style={{ display: "flex", flexDirection: "column", padding: 8}}>
 
            <TextAndCopy colorCode={colorCode} setColorArrStore={setColorArrStore}/>

            <Group position="center" direction="column">
                <ColorPicker value={colorCode} onChange={setColorCode} size="xs" swatches={colorArrStore}/>
            </Group>
            <Space h="xs" />

            <Button
                leftIcon={<Ballpen size={16} />}
                onClick={ async () => {
                    let res = await openEyesDrop();
                    if(res === ""){
                        return;
                    }
                    setColorCode(res);
                    setColorArrStore([...colorArrStore, res]);
                }}
            >
                Pick Color
            </Button>

        </div>
    )
}
