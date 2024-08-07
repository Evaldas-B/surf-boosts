import { javascript } from "@codemirror/lang-javascript"
import { Button, InputLabel } from "@mantine/core"
import { useColorScheme } from "@mantine/hooks"
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode"
import CodeMirror from "@uiw/react-codemirror"
import { useBoostFormContext } from "./boost-form-context"

export default function JavascriptTab() {
  const form = useBoostFormContext()
  const colorScheme = useColorScheme()

  return (
    <>
      <InputLabel htmlFor="boost-javascript-textarea">Javascript</InputLabel>
      <CodeMirror
        id="boost-javascript-textarea"
        height="350px"
        extensions={[javascript()]}
        theme={colorScheme === "light" ? vscodeLight : vscodeDark}
        {...form.getInputProps("javascript")}
      />

      <Button title="Save boost" type="submit" className="mt-3 w-full">
        Save
      </Button>
    </>
  )
}
