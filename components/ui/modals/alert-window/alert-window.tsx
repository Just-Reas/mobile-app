import React from "react";
import { Text, View, useColorScheme, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import ModalWindow, { ModalWindowStyles } from "@/components/ui/modals/modal-window/modal-window";
import { mergeStyles } from "@/utils/styleMerger";
import { AlertIcon } from "../../icons/AlertIcon";

export interface AlertWindowStyles {
  overlay?: ViewStyle;
  alertWindowContainer?: ViewStyle;
  alertWindowInner?: ViewStyle;
  closeButton?: ViewStyle;
  closeButtonText?: TextStyle;
  box?: ViewStyle;
  icon?: ViewStyle;
  titleText?: TextStyle;
  descriptionText?: TextStyle;
  buttonBox?: ViewStyle;
  cancelButton?: ViewStyle;
  successButton?: ViewStyle;
  cancelButtonText?: TextStyle;
  successButtonText?: TextStyle;
  actions?: ViewStyle;
}

interface AlertWindowProps {
  type: "info" | "warning" | "success" | "error";
  title: string;
  description: string;
  visible: boolean;
  styles?: AlertWindowStyles;
  iconSize?: number;
  onClose?: () => void;
  onCancel?: () => void;
  onSuccess?: () => void;
  cancelText?: string;
  successText?: string;
  closeOnOverlayTap?: boolean;
  showCloseButton?: boolean;
  actions?: React.ReactNode;
}

const AlertWindow: React.FC<AlertWindowProps> = ({
  type = "info",
  title,
  description,
  visible = false,
  styles: customStyles = {},
  iconSize = 48,
  onClose,
  onCancel,
  onSuccess,
  cancelText = "Cancel",
  successText = "OK",
  closeOnOverlayTap = true,
  showCloseButton = false,
  actions,
}) => {
  const theme = useTheme<Theme>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const baseStyles: AlertWindowStyles = {
    overlay: {
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
    },
    alertWindowContainer: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: "auto",
      marginRight: "auto",
      position: "absolute",
      top: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      display: "flex",
      backgroundColor: theme.colors.transparent,
      width: "90%",
      padding: theme.spacing.s,
      alignSelf: "center",
    },
    alertWindowInner: {
      display: "flex",
      maxHeight: 300,
      width: "90%",
      flexDirection: "column",
      alignSelf: "center",
      gap: theme.spacing.s,
      borderWidth: 4,
      borderColor: theme.colors.dialogBorder,
      backgroundColor: isDark ? theme.colors.dialogBackgroundDark : theme.colors.dialogBackground,
      borderRadius: theme.borderRadii.s,
      padding: theme.spacing.s,
    },
    box: {
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing.s,
    },
    icon: {},
    titleText: {
      fontSize: 24,
      textAlign: "center",
      color: theme.colors.dialogTitle,
    },
    descriptionText: {
      fontSize: 16,
      textAlign: "center",
      color: isDark ? theme.colors.dialogDescriptionDark : theme.colors.dialogDescription,
    },
    buttonBox: {
      marginTop: theme.spacing.m,
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.l,
    },
    closeButton: {
      width: "100%",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.m,
    },
    cancelButton: {
      flex: 1,
      maxWidth: 120,
      display: "flex",
      alignItems: "center",
      borderWidth: 4,
      borderColor: theme.colors.dialogBorder,
      backgroundColor: theme.colors.buttonBackground,
      borderRadius: theme.borderRadii.s,
      paddingHorizontal: theme.spacing.s,
      paddingVertical: theme.spacing.xs,
    },
    cancelButtonText: {
      display: "flex",
      fontSize: 16,
      color: theme.colors.buttonText,
    },
    successButton: {
      flex: 1,
      maxWidth: 120,
      display: "flex",
      alignItems: "center",
      borderWidth: 4,
      borderColor: theme.colors.dialogBorder,
      backgroundColor: theme.colors.buttonBackground,
      borderRadius: theme.borderRadii.s,
      paddingHorizontal: theme.spacing.s,
      paddingVertical: theme.spacing.xs,
    },
    successButtonText: {
      display: "flex",
      fontSize: 16,
      color: theme.colors.buttonText,
    },
    actions: {
      marginTop: theme.spacing.s,
      flexDirection: "row",
      justifyContent: "center",
      gap: theme.spacing.s,
    },
  };

  const mergedInnerStyles = mergeStyles(baseStyles, customStyles);

  const modalCustomStyles: ModalWindowStyles = {
    overlay: customStyles.overlay,
    modalWindowContainer: customStyles.alertWindowContainer,
    modalWindowInner: customStyles.alertWindowInner,
    close: customStyles.closeButton,
    closeText: customStyles.closeButtonText,
  };

  const renderActions = () => {
    if (actions) {
      return <View style={mergedInnerStyles.actions}>{actions}</View>;
    }

    if (onCancel || onSuccess) {
      return (
        <View style={mergedInnerStyles.buttonBox}>
          {onCancel && (
            <TouchableOpacity style={mergedInnerStyles.cancelButton} onPress={onCancel}>
              <Text style={mergedInnerStyles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
          )}
          {onSuccess && (
            <TouchableOpacity style={mergedInnerStyles.successButton} onPress={onSuccess}>
              <Text style={mergedInnerStyles.successButtonText}>{successText}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
      closeOnOutsideClick={closeOnOverlayTap}
      showCloseButton={showCloseButton}
      styles={modalCustomStyles}
    >
      <View style={mergedInnerStyles.box}>
        <View style={mergedInnerStyles.icon}>
          <AlertIcon type={type} size={iconSize} />
        </View>
        <Text style={mergedInnerStyles.titleText}>{title}</Text>
        <Text style={mergedInnerStyles.descriptionText}>{description}</Text>
        {renderActions()}
      </View>
    </ModalWindow>
  );
};

export default AlertWindow;