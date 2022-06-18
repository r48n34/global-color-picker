import { Space, Button, Group, Popover, UnstyledButton, Tooltip } from "@mantine/core";
import { useState } from "react";
import { Trash } from "tabler-icons-react";

type RemoveColoHistCompProps = {
    setColorArrStore: Function;
}
    
function RemoveColoHistComp({ setColorArrStore }: RemoveColoHistCompProps){
    const [opened, setOpened] = useState(false);

    return (
        <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            target={
            <Tooltip label="Remove history" withArrow>
                <UnstyledButton onClick={() => setOpened((v) => !v)} > 
                <Trash size={20}/> 
                </UnstyledButton>
            </Tooltip>}
            width={180}
            position="bottom"
            withArrow
        >
            <h4 style={{ margin: 0 }}>Are you sure?</h4>
            <Space h="xs" />
            <Group>
                <Button 
                    color="red" 
                    onClick={ () => {
                        setColorArrStore([]);
                        setOpened(false);
                    }}> 
                    Yes 
                </Button>
                <Button onClick={ () => setOpened(false) }> No </Button>
            </Group>
        </Popover>
    )
}
    
export default RemoveColoHistComp
