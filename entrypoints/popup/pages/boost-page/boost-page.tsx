import { ExtractNavigationProps } from "@/utils/storage/navigation"
import { Tabs } from "@mantine/core"

import {
  BoostFormProvider,
  boostFormSubmitHandler,
  useBoostForm,
  validate,
} from "./boost-form-context"
import ConfigTab from "./ConfigTab"
import CssTab from "./CssTab"
import JavascriptTab from "./JavascriptTab"
import {
  IconBrandCss3,
  IconBrandJavascript,
  IconSettings,
} from "@tabler/icons-react"
import useStorage from "@/utils/storage/useStorage"
import { initialValues } from "@/utils/storage/boosts"

type Props = {
  navigation: ExtractNavigationProps<"/boost">
}

export default function BoostPage({ navigation }: Props) {
  const [boosts] = useStorage("BOOSTS")
  const boostId = navigation.props.boostId
  const boost = boosts?.find((boost) => boost.id === boostId)

  const initialFormValues = { ...initialValues, id: boostId }
  const form = useBoostForm({ initialValues: initialFormValues, validate })

  if (boost && Object.keys(boost).length) form.initialize(boost)

  return (
    <Tabs
      defaultValue="config"
      keepMounted={false}
      className="flex flex-col gap-3"
    >
      <Tabs.List grow justify="center">
        <Tabs.Tab
          value="config"
          leftSection={<IconSettings />}
          title="Boost Config Tab"
        >
          Config
        </Tabs.Tab>

        <Tabs.Tab
          value="css"
          leftSection={<IconBrandCss3 />}
          title="Boost Css Tab"
        >
          CSS
        </Tabs.Tab>

        <Tabs.Tab
          value="javascript"
          leftSection={<IconBrandJavascript />}
          title="Boost JavaScript Tab"
        >
          JavaScript
        </Tabs.Tab>
      </Tabs.List>

      <BoostFormProvider form={form}>
        <form onSubmit={form.onSubmit(boostFormSubmitHandler)}>
          <Tabs.Panel value="config">
            <ConfigTab />
          </Tabs.Panel>

          <Tabs.Panel value="css">
            <CssTab />
          </Tabs.Panel>

          <Tabs.Panel value="javascript">
            <JavascriptTab />
          </Tabs.Panel>
        </form>
      </BoostFormProvider>
    </Tabs>
  )
}
