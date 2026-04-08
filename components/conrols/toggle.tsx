import { Box, useAppTheme } from "@/hooks/restyle";
import React from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";

type ToggleProps = Omit<PressableProps, "onPress"> & {
  value: boolean;
  onValueChange: (next: boolean) => void;
  disabled?: boolean;
};

export function Toggle({
  value,
  onValueChange,
  disabled,
  style,
  ...rest
}: ToggleProps) {
  const theme = useAppTheme();

  const TRACK_W = 60;
  const TRACK_H = 30;
  const BORDER_W = 2;
  const RADIUS = 35;
  const KNOB = 26;
  const KNOB_OFFSET = 2;

  const trackColor = value ? theme.colors.brandBlue : theme.colors.brandIndigo;
  const knobColor = value ? theme.colors.brandIndigo : theme.colors.brandBlue;

  const borderColor = trackColor;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style as any,
      ]}
      {...rest}
    >
      <Box
        style={{
          width: TRACK_W,
          height: TRACK_H,
          borderRadius: RADIUS,
          borderWidth: BORDER_W,
          borderColor,
          backgroundColor: trackColor,
          position: "relative",
          justifyContent: "center",
        }}
      >
        <View
          style={[
            styles.knob,
            {
              width: KNOB,
              height: KNOB,
              borderRadius: KNOB,
              backgroundColor: knobColor,
              position: "absolute",
              top: "50%",
              transform: [{ translateY: -KNOB / 2 }],
              ...(value ? { right: KNOB_OFFSET } : { left: KNOB_OFFSET }),
            },
          ]}
        />
      </Box>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  knob: {},
});
