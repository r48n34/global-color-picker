import React, { useState } from "react"
import { Accordion, ColorInput, ColorPicker, Grid, Group, Text } from '@mantine/core';
import { useStorage } from '@plasmohq/storage/hook';
import CopyColor from "./CopyColorComp";
import toast, { Toaster } from "react-hot-toast";
import { Wheel } from '@uiw/react-color';
import SaveCurrentColor from "./SaveCurrentColor";
import RemoveColoHistComp from "./RemoveColoHistComp";
import ColorDropper from "./ColorDropper";

import { ColorPicker as IconColorPicker, ListDetails } from 'tabler-icons-react';

export function Main() {

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

            <Text ta="center" mb={4} fw={300} fz={22}>
                🧭 Global Color Picker
            </Text>

            <Group position="apart" mt={4}>
                <Group>
                    <ColorDropper setColorCode={setColorCode} colorArrStore={colorArrStore} setColorArrStore={setColorArrStore}/>
                    <CopyColor colorCode={colorCode}/>
                    <SaveCurrentColor 
                        pushCurrentColor={() => {
                            setColorArrStore([...colorArrStore, colorCode]);
                            toast.success('Saved to storage')
                        }}
                    />
                </Group>

                <RemoveColoHistComp setColorArrStore={setColorArrStore}/>
            </Group>

            <Accordion variant="filled" mt={8} multiple radius="md">
                <Accordion.Item value="color-pick">
                    <Accordion.Control icon={<IconColorPicker size="1rem"/>} >Color Pick</Accordion.Control>
                    <Accordion.Panel>
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
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="history-color">
                    <Accordion.Control icon={<ListDetails size="1rem"/>}>History color</Accordion.Control>
                    <Accordion.Panel>
                        <ColorPicker
                            format="hex"
                            value={colorCode}
                            onChange={setColorCode}
                            withPicker={false}
                            fullWidth
                            swatches={colorArrStore}
                        />
                    </Accordion.Panel>
                </Accordion.Item>

            </Accordion>

            {/* <Card shadow="sm" mt={6}>

                <Text ta="left" fz={16} fw={400} c="dimmed" mb={2} mt={-2}>
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
            </Card> */}

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
