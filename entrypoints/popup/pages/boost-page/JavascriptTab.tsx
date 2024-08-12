import { javascript } from "@codemirror/lang-javascript"
import { Button, InputLabel } from "@mantine/core"
import { useColorScheme } from "@mantine/hooks"
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode"
import CodeMirror from "@uiw/react-codemirror"
import { useBoostFormContext } from "./boost-form-context"
import ReadOnlyAccessAlert from "./ReadOnlyAccess"

export default function JavascriptTab() {
  const form = useBoostFormContext()
  const colorScheme = useColorScheme()

  const { isPublic } = form.getValues()

  return (
    <>
      <InputLabel htmlFor="boost-javascript-textarea">Javascript</InputLabel>
      <CodeMirror
        id="boost-javascript-textarea"
        height={isPublic ? "310px" : "350px"}
        extensions={[javascript()]}
        readOnly={isPublic}
        theme={colorScheme === "light" ? vscodeLight : vscodeDark}
        {...form.getInputProps("javascript")}
      />

      {isPublic ? (
        <ReadOnlyAccessAlert className="mt-3" />
      ) : (
        <Button title="Save boost" type="submit" className="mt-3 w-full">
          Save
        </Button>
      )}
    </>
  )
}
