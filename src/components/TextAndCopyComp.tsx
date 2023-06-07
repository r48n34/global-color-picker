import { useState } from "react";
import { Text, Group, UnstyledButton, Tooltip } from "@mantine/core";
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
        { colorCode && (
            <Group position="center">
                <Text ta="center" fz={22} fw={500}>
                    {colorCode}
                </Text>

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
        </>
    )
}

export default TextAndCopy