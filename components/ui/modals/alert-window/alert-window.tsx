import React, { useMemo } from "react";
import {
  Text,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import ModalWindow from "@/components/ui/modals/modal-window/modal-window";
import InfoIcon from "@/assets/icons/info.svg";
import SuccessIcon from "@/assets/icons/success.svg";
import ErrorIcon from "@/assets/icons/error.svg";

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
  type: "info" | "success" | "error";
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

const IconMap = {
  info: InfoIcon,
  success: SuccessIcon,
  error: ErrorIcon,
};

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
  const { height: screenHeight } = useWindowDimensions();

  const dynamicMaxHeight = screenHeight * 0.6;
  const IconComponent = IconMap[type];

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          color: theme.colors.dialogDescription,
        },
        buttonBox: {
          marginTop: theme.spacing.m,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: theme.spacing.l,
          gap: theme.spacing.s,
        },
        cancelButton: {
          flex: 1,
          maxWidth: 120,
          alignItems: "center",
          borderWidth: 4,
          borderColor: theme.colors.dialogBorder,
          backgroundColor: theme.colors.buttonBackground,
          borderRadius: theme.borderRadii.s,
          paddingHorizontal: theme.spacing.s,
          paddingVertical: theme.spacing.xs,
        },
        cancelButtonText: {
          fontSize: 16,
          color: theme.colors.buttonText,
        },
        successButton: {
          flex: 1,
          maxWidth: 120,
          alignItems: "center",
          borderWidth: 4,
          borderColor: theme.colors.dialogBorder,
          backgroundColor: theme.colors.buttonBackground,
          borderRadius: theme.borderRadii.s,
          paddingHorizontal: theme.spacing.s,
          paddingVertical: theme.spacing.xs,
        },
        successButtonText: {
          fontSize: 16,
          color: theme.colors.buttonText,
        },
        actions: {
          marginTop: theme.spacing.s,
          flexDirection: "row",
          justifyContent: "center",
          gap: theme.spacing.s,
        },
      }),
    [theme]
  );

  const renderActions = () => {
    if (actions) {
      return <View style={[styles.actions, customStyles.actions]}>{actions}</View>;
    }

    if (onCancel || onSuccess) {
      return (
        <View style={[styles.buttonBox, customStyles.buttonBox]}>
          {onCancel && (
            <TouchableOpacity
              style={[styles.cancelButton, customStyles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={[styles.cancelButtonText, customStyles.cancelButtonText]}>
                {cancelText}
              </Text>
            </TouchableOpacity>
          )}
          {onSuccess && (
            <TouchableOpacity
              style={[styles.successButton, customStyles.successButton]}
              onPress={onSuccess}
            >
              <Text style={[styles.successButtonText, customStyles.successButtonText]}>
                {successText}
              </Text>
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
      <View style={[styles.box, customStyles.box]}>
        <View style={[styles.icon, customStyles.icon]}>
          <IconComponent width={iconSize} height={iconSize} />
        </View>
        <Text style={[styles.titleText, customStyles.titleText]}>{title}</Text>
        <Text style={[styles.descriptionText, customStyles.descriptionText]}>
          {description}
        </Text>
        {renderActions()}
      </View>
    </ModalWindow>
  );
};

export default AlertWindow;