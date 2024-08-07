import { Button } from "@mantine/core"
import { useState } from "react"

type Props = {
  onDelete: () => void
  message: string
}

export default function ConfirmDeleteInline({ onDelete, message }: Props) {
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)

  if (awaitingConfirmation)
    return (
      <div className="flex flex-col">
        <p className="mb-0.5 text-center text-xs">{message}</p>
        <div className="flex gap-3">
          <Button
            title="Cancel"
            variant="light"
            size="compact-xs"
            onClick={() => setAwaitingConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            title="Confirm"
            variant="light"
            size="compact-xs"
            color="red"
            onClick={onDelete}
          >
            Confirm
          </Button>
        </div>
      </div>
    )

  return (
    <Button
      title="Delete boost"
      variant="light"
      color="red"
      className="min-w-fit"
      onClick={() => setAwaitingConfirmation(true)}
    >
      Delete
    </Button>
  )
}
