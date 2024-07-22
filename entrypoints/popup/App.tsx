import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import Header from "./components/Header"
import PageRenderer from "./pages/page-renderer"

export default function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <div className="h-[36rem] w-96 p-5">
        <Header />

        <PageRenderer />
      </div>
    </MantineProvider>
  )
}
