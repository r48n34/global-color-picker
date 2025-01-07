import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core"
import { Main } from "~components/main"

function IndexPopup() {
    return (
        <MantineProvider
            defaultColorScheme="dark"
        >
            <Main />
        </MantineProvider>
    )
}

export default IndexPopup
