import { createTheme, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import Header from "./components/Header"
import PageRenderer from "./pages/page-renderer"
import { mantineColors } from "../utils/theme"

const theme = createTheme({
  primaryColor: "primary",
  defaultRadius: "lg",
  primaryShade: 6,
  colors: mantineColors,
})

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <div className="h-[36rem] w-96 bg-base-600 p-5">
        <Header />

        <PageRenderer />
      </div>
    </MantineProvider>
  )
}
