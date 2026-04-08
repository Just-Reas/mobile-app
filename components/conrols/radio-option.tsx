import { Box, Text, useAppTheme } from "@/hooks/restyle";
import React from "react";
import {
    Pressable,
    PressableProps,
    StyleProp,
    View,
    ViewStyle,
} from "react-native";

type RadioToggleProps = Omit<
  PressableProps,
  "onPress" | "children" | "style"
> & {
  value: boolean;
  onValueChange: (next: boolean) => void;

  labelOff: string;
  labelOn: string;

  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function RadioOption({
  value,
  onValueChange,
  labelOff,
  labelOn,
  disabled,
  style,
  ...rest
}: RadioToggleProps) {
  const theme = useAppTheme();
  const accent = theme.colors.brandBlue;

  const OUTER = 16;
  const BORDER = 2;
  const INNER = 10;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style as any,
      ]}
      {...rest}
    >
      <Box flexDirection="row" alignItems="center" gap="s">
        <Box
          style={{
            width: OUTER,
            height: OUTER,
            borderRadius: OUTER / 2,
            borderWidth: BORDER,
            borderColor: accent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {value ? (
            <View
              style={{
                width: INNER,
                height: INNER,
                borderRadius: INNER / 2,
                backgroundColor: accent,
              }}
            />
          ) : null}
        </Box>

        <Text variant="radioLabel">{value ? labelOn : labelOff}</Text>
      </Box>
    </Pressable>
  );
}
