import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Box, Text, useAppTheme } from "@/hooks/restyle";

type ChipProps = Omit<PressableProps, "children" | "style"> & {
  children: string;
  selected?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Chip({
  children,
  selected = false,
  disabled,
  style,
  ...rest
}: ChipProps) {
  const theme = useAppTheme();

  const backgroundColor = selected
    ? theme.colors.brandBlue
    : `${theme.colors.chipBg}80`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
      {...rest}
    >
      <Box
        alignItems="center"
        justifyContent="center"
        height={37}
        paddingHorizontal="l"
        borderRadius="r20"
        style={{ backgroundColor }}
      >
        <Text variant={selected ? "chipLabelSelected" : "chipLabel"}>
          {children}
        </Text>
      </Box>
    </Pressable>
  );
}