import { useState } from "react";
import { Grid, Group, UnstyledButton, Tooltip } from "@mantine/core";
import { Copy, CircleCheck } from "tabler-icons-react";
import { toCopyBoard } from "~utilis/utilis";
import RemoveColoHistComp from "./RemoveColoHistComp";

type TextAndCopyProps = {
    colorCode: string;
    setColorArrStore: Function;
}

function TextAndCopy({ colorCode, setColorArrStore }: TextAndCopyProps) {
    const [ copied, setCopied ] = useState<boolean>(false);

    return (
        <>
            <Grid>

                <Grid.Col span={9}>
                    { colorCode && (
                        <Group position="center">
                        <h4 style={{ margin: 0, textAlign: "center" }}>{colorCode}</h4>

                        <Tooltip label="Copy value" withArrow>
                            <UnstyledButton
                                disabled={copied}
                                onClick={() =>{
                                    toCopyBoard(colorCode);
                                    setCopied(true);
                                    setTimeout( () => setCopied(false), 1200);
                                }}
                            >
                                { copied ? <CircleCheck color={'#2d8660'} size={20}/> :<Copy size={20}/>}
                            </UnstyledButton>
                        </Tooltip>

                    </Group>
                    )}
                </Grid.Col>

                <Grid.Col span={3}>
                    <RemoveColoHistComp setColorArrStore={setColorArrStore}/>
                </Grid.Col>
                
            </Grid>
           
        </>
    )
}

export default TextAndCopy