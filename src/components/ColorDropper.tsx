import React from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Ballpen } from "tabler-icons-react";
import { openEyesDrop, timer } from "../utilis/utilis";
import toast from "react-hot-toast";

type ColorDropperProps = {
    setColorCode: Function;
    colorArrStore: string[];
    setColorArrStore: Function;
}

function ColorDropper({ setColorCode, colorArrStore, setColorArrStore }: ColorDropperProps) {
    return (
        <>
        <Tooltip label="Open EyesDrop" withArrow>
            <ActionIcon
                onClick={async () => {
                    try {

                        document.body.style.width = "0px"
                        document.body.style.height = "0px"

                        await timer(60);

                        let res = await openEyesDrop();

                        document.body.style.width = "470px"
                        document.body.style.height = "auto"

                        setColorCode(res);
                        setColorArrStore([...colorArrStore, res]);
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
