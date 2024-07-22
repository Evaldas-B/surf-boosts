import { ExtractNavigationProps } from "@/utils/navigation"

type Props = {
  navigation: ExtractNavigationProps<"/boost">
}

export default function BoostPage({ navigation }: Props) {
  return `Boost Page ${navigation.props.boostId}`
}
