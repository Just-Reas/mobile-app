import { Box, useAppTheme } from "@/hooks/restyle";
import React from "react";
import {
    Pressable,
    PressableProps,
    StyleProp,
    View,
    ViewStyle,
} from "react-native";

type CheckboxProps = Omit<PressableProps, "onPress" | "style"> & {
  value: boolean;
  onValueChange: (next: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Checkbox({
  value,
  onValueChange,
  disabled,
  style,
  ...rest
}: CheckboxProps) {
  const theme = useAppTheme();
  const accent = theme.colors.brandBlue;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
      {...rest}
    >
      <Box
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: accent,
          backgroundColor: value ? accent : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {value ? (
          <View
            style={{
              width: 10,
              height: 6,
              borderLeftWidth: 2.5,
              borderBottomWidth: 2.5,
              borderColor: theme.colors.text,
              transform: [{ rotate: "-45deg" }],
              marginBottom: 1,
            }}
          />
        ) : null}
      </Box>
    </Pressable>
  );
}
