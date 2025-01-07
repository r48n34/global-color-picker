import React, { useEffect, useState } from "react"
import { Box, Card, ColorInput, ColorPicker, Container, Group, Text } from '@mantine/core';
import { useStorage } from '@plasmohq/storage/hook';
import CopyColor from "./CopyColorComp";
import toast, { Toaster } from "react-hot-toast";
import SaveCurrentColor from "./SaveCurrentColor";
import RemoveColoHistComp from "./RemoveColoHistComp";
import ColorDropper from "./ColorDropper";

import { ListDetails } from 'tabler-icons-react';
import ColorDetails from "./ColorDetails";

export function Main() {

    const [initLoaded, setInitLoaded] = useState<boolean>(false);
    const [colorArrStore, setColorArrStore] = useStorage<string[]>("colorArrStore", (storedVal) =>
        typeof storedVal === "undefined" ? [] : storedVal
    )
    const [colorCode, setColorCode] = useState<string>("#FFFFFF");

    useEffect(() => {
        if (!initLoaded && colorArrStore.length >= 1) {
            setColorCode(colorArrStore[colorArrStore.length - 1])
            setInitLoaded(true)
        }
    }, [colorArrStore, initLoaded])

    if (typeof window === 'undefined') {
        return (<></>)
    }

    return (
        <Box style={{ padding: 8, width: "470px", height: "100%", overflow: "hidden" }}>
            <Toaster />

            <Text ta="center" mb={4} fw={300} fz={22}>
                🧭 Global Color Picker
            </Text>

            <Container>
                {/* <Text c="dimmed" fz={14}>
                    <ColorSwatch size="1rem" /> Color details
                </Text> */}
                <ColorDetails colorCode={colorCode} />
            </Container>

            <Container mt={16} mb={12}>
                <Group justify="space-between">
                    <Text c="dimmed" fz={14}>
                        <ListDetails size="0.8rem" /> History color
                    </Text>

                    <Group justify="flex-end">
                        {colorArrStore.length >= 1 && (
                            <RemoveColoHistComp setColorArrStore={setColorArrStore} />
                        )}
                    </Group>
                </Group>

                <ColorPicker
                    size="md"
                    format="hex"
                    value={colorCode}
                    onChange={setColorCode}
                    withPicker={false}
                    fullWidth
                    swatchesPerRow={12}
                    swatches={colorArrStore}
                />
            </Container>

            <Card
                shadow="sm"
                mt={4}
                padding="xs"
                radius="md"
                withBorder
                style={{ overflow: "visible", position: 'sticky', top: 10, zIndex: 3000 }}
            >
                <Group justify="space-between">
                    <Group>
                        <ColorDropper
                            setColorCode={setColorCode}
                            colorArrStore={colorArrStore}
                            setColorArrStore={setColorArrStore}
                        />
                        <CopyColor colorCode={colorCode} />
                        <SaveCurrentColor
                            pushCurrentColor={() => {
                                setColorArrStore([...colorArrStore, colorCode]);
                                toast.success('Saved to storage')
                            }}
                        />
                    </Group>

                    <ColorInput
                        size="sm"
                        withEyeDropper={false}
                        value={colorCode}
                        radius="md"
                        variant="unstyled"
                        popoverProps={{
                            zIndex: 9999,
                            position: "bottom"
                        }}
                        onChangeEnd={(v) => {
                            setColorCode(v);
                        }}
                    />

                </Group>
            </Card>

        </Box>
    )
}
