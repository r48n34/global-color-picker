import { ActionIcon, Tooltip } from "@mantine/core";
import { Ballpen } from "tabler-icons-react";
import { openEyesDrop } from "~utilis/utilis";
import toast from "react-hot-toast";

type ColorDropperProps = {
    setColorCode: Function;
    setColorArrStore: Function;
}

function ColorDropper({ setColorCode, setColorArrStore }: ColorDropperProps) {
    return (
        <>
        <Tooltip label="Open EyesDrop" withArrow>
            <ActionIcon
                onClick={async () => {
                    try {
                        let res = await openEyesDrop();
                        setColorCode(res);
                        setColorArrStore( v => [...v, res]);
                        toast.success('Copied to clipboard!')
                    }
                    catch (err: any) {
                        toast.error('Fail to Copied')
                    }
                }}
            >
                <Ballpen size="1.425rem" />
            </ActionIcon>
        </Tooltip>
        </>
    )
}

export default ColorDropper
