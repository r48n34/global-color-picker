import React from "react";
import { useState } from "react";
import { Tooltip, ActionIcon } from "@mantine/core";
import { Copy, CircleCheck } from "tabler-icons-react";
import { toCopyBoard } from "../utilis/utilis";

type CopyColorProps = {
    colorCode: string;
}

function CopyColor({ colorCode }: CopyColorProps) {
    const [ copied, setCopied ] = useState<boolean>(false);

    return (
        <>
        <Tooltip label="Copy current value" withArrow zIndex={9999}>
            <ActionIcon
                color="#dbdbdb"
                variant="subtle"
                disabled={copied}
                onClick={() =>{
                    toCopyBoard(colorCode);
                    
                    setCopied(true);
                    setTimeout( () => setCopied(false), 1200);
                }}
            >
                { copied ? <CircleCheck color={'#2d8660'} size="1.425rem"/> :<Copy size="1.425rem"/>}
            </ActionIcon>
        </Tooltip>
        </>
    )
}

export default CopyColor