import { useState } from "react"
import { Card, ColorInput, ColorPicker, Grid, Group, Space, Text } from '@mantine/core';
import { useStorage } from '@plasmohq/storage';
import CopyColor from "./CopyColorComp";
import { Toaster } from "react-hot-toast";
import { Wheel } from '@uiw/react-color';
import SaveCurrentColor from "./SaveCurrentColor";
import RemoveColoHistComp from "./RemoveColoHistComp";
import ColorDropper from "./ColorDropper";

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

            <Group position="apart" mt={8}>
                <Group>
                    <SaveCurrentColor 
                        pushCurrentColor={() => setColorArrStore([...colorArrStore, colorCode])}
                    />
                    <ColorDropper setColorCode={setColorCode} setColorArrStore={setColorArrStore}/>
                    <CopyColor colorCode={colorCode}/>
                </Group>

                <RemoveColoHistComp setColorArrStore={setColorArrStore}/>
            </Group>

            <Card shadow="sm" mt={6}>

                <Text ta="left" fz={16} fw={400} c="dimmed" mb={2}>
                    History color
                </Text>

                <ColorPicker
                    format="hex"
                    value={colorCode}
                    onChange={setColorCode}
                    withPicker={false}
                    fullWidth
                    swatches={colorArrStore}
                />
            </Card>

            <ColorInput
                mt={10}
                size="lg"
                withEyeDropper
                value={colorCode}
                onChange={(v) => {
                    setColorCode(v);
                }}
            />
           
        </div>
        </>
    )
}
