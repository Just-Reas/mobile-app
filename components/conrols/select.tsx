import React from "react";
import {
  Modal,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";

import { Box, Text, useAppTheme } from "@/hooks/restyle";

export type SelectOption<T extends string> = {
  label: string;
  value: T;
};

type SelectProps<T extends string> = Omit<
  PressableProps,
  "onPress" | "children"
> & {
  value: T | null;
  onValueChange: (next: T) => void;
  options: Array<SelectOption<T>>;

  placeholder?: string;
  disabled?: boolean;
};

export function Select<T extends string>({
  value,
  onValueChange,
  options,
  placeholder = "Select",
  disabled,
  ...rest
}: SelectProps<T>) {
  const theme = useAppTheme();
  const [open, setOpen] = React.useState(false);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder;

  const close = () => setOpen(false);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={({ pressed }) => ({
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        })}
        {...rest}
      >
        <Box
          style={{
            height: 31,
            paddingHorizontal: 11,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: theme.colors.borderAccent,
            backgroundColor: theme.colors.transparent,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            minWidth: 174,
          }}
        >
          <Text variant="buttonSecondary">{selectedLabel}</Text>

          <Text variant="buttonSecondary">▾</Text>
        </Box>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={styles.backdrop} onPress={close} />

        <View style={styles.center}>
          <Box
            style={{
              width: 280,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: theme.colors.borderAccent,
              backgroundColor: theme.colors.bg,
              padding: 12,
              gap: 10 as any,
            }}
          >
            <Text variant="buttonPrimary">Select</Text>

            {options.map((opt) => {
              const isSelected = opt.value === value;

              return (
                <Pressable
                  key={opt.value}
                  onPress={() => {
                    onValueChange(opt.value);
                    close();
                  }}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Box
                    style={{
                      height: 40,
                      paddingHorizontal: 11,
                      borderRadius: 20,
                      borderWidth: 2,
                      borderColor: theme.colors.borderAccent,
                      backgroundColor: isSelected
                        ? theme.colors.chipSelectedBg
                        : theme.colors.transparent,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text variant="buttonPrimary">{opt.label}</Text>
                    {isSelected ? <Text variant="buttonPrimary">✓</Text> : null}
                  </Box>
                </Pressable>
              );
            })}
          </Box>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
