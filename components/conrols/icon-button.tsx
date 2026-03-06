import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

import { Box, useAppTheme } from "@/hooks/restyle";

type IconComponent = React.FC<SvgProps>;

type IconButtonProps = Omit<PressableProps, "style" | "children"> & {
  icon: IconComponent;

  size?: number;

  iconSize?: number;

  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon: Icon,
  size = 40,
  iconSize = 24,
  disabled,
  style,
  ...rest
}: IconButtonProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        style,
      ]}
      {...rest}
    >
      <Box
        style={{
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          width={iconSize}
          height={iconSize}
          color={theme.colors.brandBlue}
        />
      </Box>
    </Pressable>
  );
}
