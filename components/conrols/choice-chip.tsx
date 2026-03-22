import React from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

import { Chip } from "@/components/conrols/chip";

type ChoiceChipProps = Omit<
  PressableProps,
  "children" | "style" | "onPress"
> & {
  children: string;
  selected: boolean;
  onPress: NonNullable<PressableProps["onPress"]>;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ChoiceChip({
  children,
  selected,
  onPress,
  disabled,
  style,
  ...rest
}: ChoiceChipProps) {
  return (
    <Chip
      selected={selected}
      onPress={onPress}
      disabled={disabled}
      style={style}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: !!disabled }}
      {...rest}
    >
      {children}
    </Chip>
  );
}