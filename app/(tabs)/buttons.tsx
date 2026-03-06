import React from "react";

import { Button } from "@/components/conrols/button";
import { Checkbox } from "@/components/conrols/checkbox";
import { IconButton } from "@/components/conrols/icon-button";
import { RadioOption } from "@/components/conrols/radio-option";
import { Select } from "@/components/conrols/select";
import { Toggle } from "@/components/conrols/toggle";
import { Box } from "@/hooks/restyle";

import ic_calendar_today from "@/assets/icons/ic_calendar_today.svg";
import ic_settings from "@/assets/icons/ic_settings.svg";

export default function ButtonsScreen() {
  const [role, setRole] = React.useState<"student" | "trainer">("student");
  const [signed, setSigned] = React.useState(false);
  const [signed1, setSigned1] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [option, setOption] = React.useState<"a" | "b" | "c" | null>(null);

  return (
    <Box
      flex={1}
      backgroundColor="bg"
      justifyContent="center"
      alignItems="center"
      gap="xl"
    >
      <Box flexDirection="row" gap="xl">
        <Button
          variant="primary"
          selected={role === "student"}
          onPress={() => setRole("student")}
        >
          Button
        </Button>

        <Button
          variant="primary"
          selected={role === "trainer"}
          onPress={() => setRole("trainer")}
        >
          Button
        </Button>
      </Box>

      <Box width={174} alignItems="center">
        <Button variant="secondary" onPress={() => {}}>
          Button
        </Button>
      </Box>
      <Toggle value={signed} onValueChange={setSigned} />

      <Box padding="xl" gap="l">
        <RadioOption
          value={signed1}
          onValueChange={setSigned1}
          labelOff="Записаться"
          labelOn="Записаны"
        />
      </Box>

      <Box padding="xl" gap="l">
        <Checkbox value={checked} onValueChange={setChecked} />
      </Box>

      <Box padding="xl" gap="l">
        <Select
          value={option}
          onValueChange={setOption}
          placeholder="Select"
          options={[
            { label: "Option A", value: "a" },
            { label: "Option B", value: "b" },
            { label: "Option C", value: "c" },
          ]}
        />
      </Box>

      <Box flexDirection="row" gap="xl">
        <IconButton icon={ic_calendar_today} onPress={() => {}} />
        <IconButton icon={ic_settings} onPress={() => {}} />
      </Box>
    </Box>
  );
}
