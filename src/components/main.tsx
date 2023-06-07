import { useState } from "react"
import { Button, Card, ColorPicker, Grid, Group, Space } from '@mantine/core';
import { useStorage } from '@plasmohq/storage';
import { openEyesDrop } from "~utilis/utilis";
import { Ballpen } from 'tabler-icons-react';
import TextAndCopy from "./TextAndCopyComp";
import toast, { Toaster } from "react-hot-toast";
import { Wheel, Material } from '@uiw/react-color';
import SaveCurrentColor from "./SaveCurrentColor";
import RemoveColoHistComp from "./RemoveColoHistComp";

export function Main({ name = "Global color picker" }) {

    if (typeof window === 'undefined') { 
        return (<></>)
    } 

    const [ colorCode, setColorCode ] = useState<string>("#FFFFFF");
    const [ colorArrStore, setColorArrStore ] = useStorage<string[]>("colorArrStore", (storedVal) =>
        typeof storedVal === "undefined" ? [] : storedVal
    )

    return (
        <>
        <Toaster />
        <div style={{ display: "flex", flexDirection: "column", padding: 8, width: "470px" }}>

            <TextAndCopy colorCode={colorCode} setColorArrStore={setColorArrStore}/>

            <Grid mt={4}>
                <Grid.Col span={6}>
                    <Group position="center">
                        <Wheel color={colorCode} onChange={(color) => setColorCode(color.hex)}/>
                    </Group>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Group position="center">
                        <ColorPicker 
                            size="lg"
                            value={colorCode}
                            onChange={setColorCode}
                        />
                    </Group>
                </Grid.Col>
            </Grid>

            <Space h="xs" />

            <Group>
                <SaveCurrentColor 
                    pushCurrentColor={() => setColorArrStore([...colorArrStore, colorCode])}
                />
                <RemoveColoHistComp setColorArrStore={setColorArrStore}/>
            </Group>

            <Card shadow="sm" mt={4}>
                <ColorPicker
                    format="hex"
                    value={colorCode}
                    onChange={setColorCode}
                    withPicker={false}
                    fullWidth
                    swatches={colorArrStore}
                />
            </Card>
            
            <Button
                mt={8} variant="light"
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
