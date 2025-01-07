import { Box, Grid, Text, UnstyledButton } from "@mantine/core";
import { hexToHSL, hexToRgb, toCopyBoard } from "~utilis/utilis";

type ColorDetailsProps = {
    colorCode: string;
}

function ColorDetails({ colorCode = "#FFFFFF" }: ColorDetailsProps){

    const rgb = hexToRgb(colorCode)
    const hls = hexToHSL(colorCode)

    return (
        <>
        <Grid mt={12}>
            <Grid.Col span={4}>
                <UnstyledButton onClick={ () => toCopyBoard(colorCode) }>  
                    <Box>
                        <Text fz={10} c="dimmed">Hex</Text>
                        <Text fz={16}>{colorCode}</Text>
                    </Box>
                </UnstyledButton>
            </Grid.Col>

            <Grid.Col span={4}>
                <UnstyledButton onClick={ () => toCopyBoard(rgb) }>
                <Box>
                    <Text fz={10} c="dimmed">RGB</Text>
                    <Text fz={16}>{rgb}</Text>
                </Box>
                </UnstyledButton>
            </Grid.Col>

            <Grid.Col span={4}>
                <UnstyledButton onClick={ () => toCopyBoard(hls) }>
                <Box>
                    <Text fz={10} c="dimmed">HSL</Text>
                    <Text fz={16}>{hls}</Text>
                </Box>
                </UnstyledButton>
            </Grid.Col>
        </Grid>
        </>
    )
}
    
export default ColorDetails
