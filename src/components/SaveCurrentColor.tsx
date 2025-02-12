import React from "react";
import { Tooltip, ActionIcon } from "@mantine/core";
import { FileSymlink } from 'tabler-icons-react';

type SaveCurrentColorProps = {
    pushCurrentColor: Function;
}

function SaveCurrentColor({ pushCurrentColor }: SaveCurrentColorProps) {

    return (
        <>
            <Tooltip label="Save current color to history" withArrow zIndex={9999}>
                <ActionIcon
                    color="#dbdbdb"
                    onClick={() => pushCurrentColor()}
                    variant="subtle"
                >
                    <FileSymlink size="1.425rem" />
                </ActionIcon>
            </Tooltip>
        </>
    )
}

export default SaveCurrentColor