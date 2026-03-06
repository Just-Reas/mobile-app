import React from "react";
import {
    Pressable,
    PressableProps,
    PressableStateCallbackType,
    StyleProp,
    ViewStyle,
} from "react-native";

import { Box, Text } from "@/hooks/restyle";

type ButtonVariant = "primary" | "secondary";

type Props = Omit<PressableProps, "children" | "style"> & {
  variant?: ButtonVariant;
  selected?: boolean;
  children: string;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
};

export function Button({
  variant = "primary",
  selected = false,
  disabled,
  children,
  style,
  ...rest
}: Props) {
  const isPrimary = variant === "primary";

  const pressableStyle = (
    state: PressableStateCallbackType,
  ): StyleProp<ViewStyle> => {
    const base: ViewStyle = {
      opacity: disabled ? 0.5 : state.pressed ? 0.85 : 1,
    };

    const userStyle = typeof style === "function" ? style(state) : style;
    return [base, userStyle];
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={pressableStyle}
      {...rest}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        height={isPrimary ? 40 : 31}
        paddingHorizontal="px11"
        borderRadius="r20"
        borderWidth={2}
        borderColor="borderAccent"
        backgroundColor={
          isPrimary && selected ? "chipSelectedBg" : "transparent"
        }
      >
        <Text variant={isPrimary ? "buttonPrimary" : "buttonSecondary"}>
          {children}
        </Text>
      </Box>
    </Pressable>
  );
}
