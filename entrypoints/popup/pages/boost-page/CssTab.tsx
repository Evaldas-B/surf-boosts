import { less } from "@codemirror/lang-less"
import { Button, InputLabel } from "@mantine/core"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import CodeMirror from "@uiw/react-codemirror"
import { useBoostFormContext } from "./boost-form-context"
import ReadOnlyAccessAlert from "./ReadOnlyAccess"

export default function CssTab() {
  const form = useBoostFormContext()

  const { isPublic } = form.getValues()

  return (
    <>
      <InputLabel htmlFor="boost-css-textarea">CSS</InputLabel>
      <CodeMirror
        id="boost-css-textarea"
        height={isPublic ? "310px" : "350px"}
        extensions={[less()]}
        readOnly={isPublic}
        theme={vscodeDark}
        {...form.getInputProps("css")}
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
