import React from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Ballpen } from "tabler-icons-react";
import { hidePOPUp, openEyesDrop, showPOPUp, timer } from "../utilis/utilis";
import toast from "react-hot-toast";

type ColorDropperProps = {
    setColorCode: Function;
    colorArrStore: string[];
    setColorArrStore: Function;
}

function ColorDropper({ setColorCode, colorArrStore, setColorArrStore }: ColorDropperProps) {
    return (
        <>
        <Tooltip label="Pick Color" withArrow zIndex={9999}>
            <ActionIcon
                color="#dbdbdb"
                variant="subtle"
                onClick={async () => {
                    try {
                        hidePOPUp();   
                        await timer(60);
                        
                        const coloeCode = await openEyesDrop();

                        setColorCode(coloeCode);
                        setColorArrStore([...colorArrStore, coloeCode]);
                    }
                    catch (error) {
                        console.log(error);
                        if(error !== "Canceled"){
                            console.error(error);
                            toast.error('Fail to Copied')
                        }
                    }
                    finally{
                        showPOPUp();
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
