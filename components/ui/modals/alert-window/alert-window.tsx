import React, { useMemo } from "react";
import { Text, View, useColorScheme, ViewStyle, TextStyle, TouchableOpacity, useWindowDimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import ModalWindow from "@/components/ui/modals/modal-window/modal-window";
import { AlertIcon } from "../../icons/AlertIcon";

export interface AlertWindowStyles {
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
  const { height: screenHeight } = useWindowDimensions();

  const dynamicMaxHeight = screenHeight * 0.6;

  const baseStyles = useMemo(() => ({
    box: {
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing.s,
    } as ViewStyle,
    icon: {} as ViewStyle,
    titleText: {
      fontSize: 24,
      textAlign: "center",
      color: theme.colors.dialogTitle,
    } as TextStyle,
    descriptionText: {
      fontSize: 16,
      textAlign: "center",
      color: isDark ? theme.colors.dialogDescriptionDark : theme.colors.dialogDescription,
    } as TextStyle,
    buttonBox: {
      marginTop: theme.spacing.m,
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.l,
    } as ViewStyle,
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
    } as ViewStyle,
    cancelButtonText: {
      display: "flex",
      fontSize: 16,
      color: theme.colors.buttonText,
    } as TextStyle,
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
    } as ViewStyle,
    successButtonText: {
      display: "flex",
      fontSize: 16,
      color: theme.colors.buttonText,
    } as TextStyle,
    actions: {
      marginTop: theme.spacing.s,
      flexDirection: "row",
      justifyContent: "center",
      gap: theme.spacing.s,
    } as ViewStyle,
  }), [theme, isDark]);

  const renderActions = () => {
    if (actions) {
      return <View style={[baseStyles.actions, customStyles.actions]}>{actions}</View>;
    }

    if (onCancel || onSuccess) {
      return (
        <View style={[baseStyles.buttonBox, customStyles.buttonBox]}>
          {onCancel && (
            <TouchableOpacity style={[baseStyles.cancelButton, customStyles.cancelButton]} onPress={onCancel}>
              <Text style={[baseStyles.cancelButtonText, customStyles.cancelButtonText]}>{cancelText}</Text>
            </TouchableOpacity>
          )}
          {onSuccess && (
            <TouchableOpacity style={[baseStyles.successButton, customStyles.successButton]} onPress={onSuccess}>
              <Text style={[baseStyles.successButtonText, customStyles.successButtonText]}>{successText}</Text>
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
      styles={{
        modalWindowInner: { maxHeight: dynamicMaxHeight },
      }}
    >
      <View style={[baseStyles.box, customStyles.box]}>
        <View style={[baseStyles.icon, customStyles.icon]}>
          <AlertIcon type={type} size={iconSize} />
        </View>
        <Text style={[baseStyles.titleText, customStyles.titleText]}>{title}</Text>
        <Text style={[baseStyles.descriptionText, customStyles.descriptionText]}>{description}</Text>
        {renderActions()}
      </View>
    </ModalWindow>
  );
};

export default AlertWindow;