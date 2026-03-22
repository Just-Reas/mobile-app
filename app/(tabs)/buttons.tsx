import React from "react";

import { Button } from "@/components/conrols/button";
import { Checkbox } from "@/components/conrols/checkbox";
import { Chip } from "@/components/conrols/chip";
import { ChoiceChip } from "@/components/conrols/choice-chip";
import { IconButton } from "@/components/conrols/icon-button";
import { RadioOption } from "@/components/conrols/radio-option";
import { Select } from "@/components/conrols/select";
import { Toggle } from "@/components/conrols/toggle";
import { Box } from "@/hooks/restyle";

import ic_calendar_today from "@/assets/icons/ic_calendar_today.svg";
import ic_settings from "@/assets/icons/ic_settings.svg";

type Group = "Бдз236" | "Бдз237" | "Бдз238" | "Бдз239";

export default function ButtonsScreen() {
  const [role, setRole] = React.useState<"student" | "trainer">("student");
  const [signed, setSigned] = React.useState(false);
  const [signed1, setSigned1] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [option, setOption] = React.useState<"a" | "b" | "c" | null>(null);
  const [selectedGroup, setSelectedGroup] = React.useState<Group | null>(null);

  const handleGroupPress = (group: Group) => {
    setSelectedGroup((prev) => (prev === group ? null : group));
  };

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

      <Box padding="xl" gap="l" alignItems="center">
        <Chip onPress={() => {}}>Chip</Chip>
      </Box>

      <Box
        width={360}
        padding="xl"
        gap="s"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        <ChoiceChip
          selected={selectedGroup === "Бдз236"}
          onPress={() => handleGroupPress("Бдз236")}
        >
          Бдз236
        </ChoiceChip>

        <ChoiceChip
          selected={selectedGroup === "Бдз237"}
          onPress={() => handleGroupPress("Бдз237")}
        >
          Бдз237
        </ChoiceChip>

        <ChoiceChip
          selected={selectedGroup === "Бдз238"}
          onPress={() => handleGroupPress("Бдз238")}
        >
          Бдз238
        </ChoiceChip>

        <ChoiceChip
          selected={selectedGroup === "Бдз239"}
          onPress={() => handleGroupPress("Бдз239")}
        >
          Бдз239
        </ChoiceChip>
      </Box>

      <Box flexDirection="row" gap="xl">
        <IconButton icon={ic_calendar_today} onPress={() => {}} />
        <IconButton icon={ic_settings} onPress={() => {}} />
      </Box>
    </Box>
  );
}
