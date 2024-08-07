import { less } from "@codemirror/lang-less"
import { Button, InputLabel } from "@mantine/core"
import { useColorScheme } from "@mantine/hooks"
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode"
import CodeMirror from "@uiw/react-codemirror"
import { useBoostFormContext } from "./boost-form-context"

export default function CssTab() {
  const form = useBoostFormContext()
  const colorScheme = useColorScheme()

  return (
    <>
      <InputLabel htmlFor="boost-css-textarea">CSS</InputLabel>
      <CodeMirror
        id="boost-css-textarea"
        height="350px"
        extensions={[less()]}
        theme={colorScheme === "light" ? vscodeLight : vscodeDark}
        {...form.getInputProps("css")}
      />

      <Button title="Save boost" type="submit" className="mt-3 w-full">
        Save
      </Button>
    </>
  )
}
