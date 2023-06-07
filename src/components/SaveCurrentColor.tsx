import { Tooltip, ActionIcon } from "@mantine/core";
import { FileSymlink } from 'tabler-icons-react';

type SaveCurrentColorProps = {
    pushCurrentColor: Function;
}

function SaveCurrentColor({ pushCurrentColor }: SaveCurrentColorProps) {

    return (
        <>
        <Tooltip label="Save current color" withArrow>
            <ActionIcon onClick={ () => pushCurrentColor() }>
                <FileSymlink size="1.425rem" />
            </ActionIcon>
        </Tooltip>
        </>
    )
}

export default SaveCurrentColor