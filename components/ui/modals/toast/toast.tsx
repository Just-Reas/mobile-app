import React, { useEffect } from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { mergeStyles } from "@/utils/styleMerger";
import { AlertIcon } from "../../icons/AlertIcon";

export interface ToastStyles {
  toastContainer?: ViewStyle;
  toastInner?: ViewStyle;
  close?: ViewStyle;
  closeText?: TextStyle;
  box?: ViewStyle;
  icon?: ViewStyle;
  titleText?: TextStyle;
  descriptionText?: TextStyle;
  content?: ViewStyle;
  actions?: ViewStyle;
}

interface ToastProps {
  type: "info" | "warning" | "success" | "error";
  title: string;
  description?: string;
  styles?: ToastStyles;
  iconSize?: number;
  onClose?: () => void;
  autoHide?: boolean;
  autoHideDuration?: number;
  actions?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({
  type = "info",
  title,
  description,
  styles: customStyles = {},
  iconSize = 48,
  onClose,
  autoHide = false,
  autoHideDuration = 3000,
  actions,
}) => {
  const theme = useTheme<Theme>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const baseStyles: ToastStyles = {
    toastContainer: {
      position: "absolute",
      top: theme.spacing.xl,
      left: theme.spacing.xl,
      right: theme.spacing.xl,
      zIndex: 10000,
      alignItems: "center",
      pointerEvents: "box-none",
    },
    toastInner: {
      backgroundColor: isDark ? theme.colors.toastBackgroundDark : theme.colors.toastBackground,
      borderRadius: theme.borderRadii.m,
      padding: theme.spacing.l,
      minWidth: 300,
      maxWidth: 400,
      shadowColor: theme.colors.modalShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDark ? 0.5 : 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: isDark ? theme.colors.toastBorderDark : theme.colors.toastBorder,
    },
    close: {
      position: "absolute",
      top: theme.spacing.xs,
      right: theme.spacing.xs,
      zIndex: 10001,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: isDark ? theme.colors.toastCloseBgDark : theme.colors.toastCloseBg,
    },
    closeText: {
      fontSize: 24,
      color: isDark ? theme.colors.modalCloseTextDark : theme.colors.modalCloseText,
      fontWeight: "bold",
      lineHeight: 24,
      textAlign: "center",
    },
    box: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.m,
    },
    icon: {
      marginRight: theme.spacing.s,
    },
    titleText: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? theme.colors.toastTitleDark : theme.colors.toastTitle,
    },
    descriptionText: {
      fontSize: 14,
      color: isDark ? theme.colors.toastDescriptionDark : theme.colors.toastDescription,
    },
    content: {
      flex: 1,
      flexDirection: "column",
    },
    actions: {
      marginTop: theme.spacing.s,
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: theme.spacing.s,
    },
  };

  const mergedStyles = mergeStyles(baseStyles, customStyles);

  useEffect(() => {
    if (autoHide && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDuration, onClose]);

  return (
    <View style={[mergedStyles.toastContainer]}>
      <View style={[mergedStyles.toastInner]}>
        {onClose && (
          <TouchableOpacity style={[mergedStyles.close]} onPress={onClose}>
            <Text style={[mergedStyles.closeText]}>×</Text>
          </TouchableOpacity>
        )}
        <View style={[mergedStyles.box]}>
          <View style={[mergedStyles.icon]}>
            <AlertIcon type={type} size={iconSize} />
          </View>
          <View style={[mergedStyles.content]}>
            <Text style={[mergedStyles.titleText]}>{title}</Text>
            {description && (
              <Text style={[mergedStyles.descriptionText]}>
                {description}
              </Text>
            )}
            {actions && (
              <View style={[mergedStyles.actions]}>
                {actions}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Toast;