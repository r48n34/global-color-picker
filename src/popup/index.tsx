/*global chrome*/
import { MantineProvider } from "@mantine/core"
import { Main } from "~components/main"

function IndexPopup() {
  return ( 
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
        <Main  /> 
    </MantineProvider>
  )
}

export default IndexPopup
