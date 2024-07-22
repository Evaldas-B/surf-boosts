import { ExtractNavigationProps } from "@/utils/navigation"

type Props = {
  navigation: ExtractNavigationProps<"/boost-pack">
}

export default function BoostPackPage({ navigation }: Props) {
  return `Boost Packs Page ${navigation.props.boostPackId}`
}
