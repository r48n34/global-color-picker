import React from "react";
import { Space, Button, Group, Popover, UnstyledButton, Tooltip, Text } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
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
            width={180}
            position="bottom"
            withArrow
        >
            <Popover.Target>
                <Tooltip label="Remove all history" withArrow>
                    <UnstyledButton onClick={() => setOpened((v) => !v)} > 
                    <Trash size="1.325rem"/> 
                    </UnstyledButton>
                </Tooltip>
            </Popover.Target>

            <Popover.Dropdown>

                <Text style={{ margin: 0 }}>
                    Are you sure to clear all history color?
                </Text>

                <Space h="xs" />
                <Group>
                    <Button 
                        color="red" 
                        onClick={ () => {
                            setColorArrStore([]);
                            setOpened(false);
                            toast.success('Success to clear')
                        }}> 
                        Yes 
                    </Button>
                    <Button onClick={ () => setOpened(false) }> No </Button>
                </Group>
            </Popover.Dropdown>

        </Popover>
    )
}
    
export default RemoveColoHistComp
