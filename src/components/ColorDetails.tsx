import { Box, ColorSwatch, Grid, Group, Text, UnstyledButton } from "@mantine/core";
import { hexToHSL, hexToRgb, toCopyBoard } from "~utilis/utilis";

type ColorDetailsProps = {
    colorCode: string;
}

function ColorDetails({ colorCode = "#FFFFFF" }: ColorDetailsProps){

    const rgb = hexToRgb(colorCode)
    const hls = hexToHSL(colorCode)

    return (
        <>
        <Grid mt={4}>
            <Grid.Col span={12}>
                <UnstyledButton onClick={ () => toCopyBoard(colorCode)}>
                <Group position="left" spacing="xs">
                    <Box>
                        <Text fz={10} c="dimmed">Hex</Text>
                        <Text fz={18}>{colorCode}</Text>
                    </Box>
                    <ColorSwatch color={colorCode} mt={14} ml={4} />
                </Group>
                </UnstyledButton>
            </Grid.Col>
            <Grid.Col span={6}>
                <UnstyledButton onClick={ () => toCopyBoard(rgb)}>
                <Box>
                    <Text fz={10} c="dimmed">RGB</Text>
                    <Text fz={18}>{rgb}</Text>
                </Box>
                </UnstyledButton>
            </Grid.Col>
            <Grid.Col span={6}>
                <UnstyledButton onClick={ () => toCopyBoard(hls)}>
                <Box>
                    <Text fz={10} c="dimmed">HSL</Text>
                    <Text fz={18}>{hls}</Text>
                </Box>
                </UnstyledButton>
            </Grid.Col>
        </Grid>




        </>
    )
}
    
export default ColorDetails
