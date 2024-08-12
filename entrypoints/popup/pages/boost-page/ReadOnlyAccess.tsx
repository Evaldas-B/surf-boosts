import { Alert } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"

type Props = {
  className?: string
}

export default function ReadOnlyAccessAlert({ className = "" }: Props) {
  const icon = <IconInfoCircle />

  return (
    <Alert
      variant="light"
      color="blue"
      title="Readonly Access"
      icon={icon}
      className={className}
    >
      You can only edit boosts that you created
    </Alert>
  )
}
