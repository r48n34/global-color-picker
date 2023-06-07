import { useState } from "react";
import { Text, Group, UnstyledButton, Tooltip } from "@mantine/core";
import { Copy, CircleCheck } from "tabler-icons-react";
import { toCopyBoard } from "~utilis/utilis";
import RemoveColoHistComp from "./RemoveColoHistComp";
import toast from "react-hot-toast";

type CopyColorProps = {
    colorCode: string;
}

function CopyColor({ colorCode }: CopyColorProps) {
    const [ copied, setCopied ] = useState<boolean>(false);

    return (
        <>
        <Tooltip label="Copy current value" withArrow>
            <UnstyledButton
                disabled={copied}
                onClick={() =>{
                    toCopyBoard(colorCode);
                    setCopied(true);
                    toast.success('Copied to clipboard!');
                    setTimeout( () => setCopied(false), 1200);
                }}
            >
                { copied ? <CircleCheck color={'#2d8660'} size="1.425rem"/> :<Copy size="1.425rem"/>}
            </UnstyledButton>
        </Tooltip>
        </>
    )
}

export default CopyColor