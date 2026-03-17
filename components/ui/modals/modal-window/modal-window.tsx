import React, { useEffect, useRef } from "react";
import {
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
  TouchableOpacity,
  Animated,
  Modal,
  Platform,
  Text,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { mergeStyles } from "@/utils/styleMerger";

export interface ModalWindowStyles {
  modalWindowContainer?: ViewStyle;
  modalWindowInner?: ViewStyle;
  close?: ViewStyle;
  closeText?: TextStyle;
  content?: ViewStyle;
  overlay?: ViewStyle;
}

interface ModalWindowProps {
  children: React.ReactNode;
  styles?: ModalWindowStyles;
  visible: boolean;
  onClose?: () => void;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  children,
  styles: customStyles = {},
  visible = false,
  onClose,
  closeOnOutsideClick = true,
  showCloseButton = false,
}) => {
  const theme = useTheme<Theme>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const baseStyles: ModalWindowStyles = {
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9998,
    },
    modalWindowContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      padding: theme.spacing.xl,
    },
    modalWindowInner: {
      backgroundColor: isDark ? theme.colors.dialogBackgroundDark : theme.colors.dialogBackground,
      borderRadius: theme.borderRadii.m,
      padding: theme.spacing.xl,
      maxWidth: 500,
      width: "100%",
      maxHeight: "80%",
      shadowColor: theme.colors.modalShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDark ? 0.5 : 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      position: "relative",
      ...(isDark ? { borderWidth: 1, borderColor: theme.colors.dialogBorderDark } : {}),
    },
    close: {
      position: "absolute",
      top: theme.spacing.m,
      right: theme.spacing.m,
      zIndex: 10000,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: theme.borderRadii.round, 
      backgroundColor: isDark ? theme.colors.modalCloseBgDark : theme.colors.modalCloseBg,
    },
    closeText: {
      fontSize: 24,
      color: isDark ? theme.colors.modalCloseTextDark : theme.colors.modalCloseText,
      fontWeight: "bold",
    },
    content: {
      width: "100%",
    },
  };

  const mergedStyles = mergeStyles(baseStyles, customStyles);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleOverlayPress = () => {
    if (closeOnOutsideClick && onClose) {
      onClose();
    }
  };

  const renderContent = () => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[mergedStyles.overlay, { opacity: opacityAnim }]}
        activeOpacity={1}
        onPress={handleOverlayPress}
      />

      <View
        style={[mergedStyles.modalWindowContainer]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            mergedStyles.modalWindowInner,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {showCloseButton && onClose && (
            <TouchableOpacity style={[mergedStyles.close]} onPress={onClose}>
              <Text style={mergedStyles.closeText}>×</Text>
            </TouchableOpacity>
          )}

          <View style={[mergedStyles.content]}>{children}</View>
        </Animated.View>
      </View>
    </View>
  );

  if (Platform.OS === "ios" || Platform.OS === "android") {
    return (
      <Modal
        transparent
        visible={visible}
        animationType="none"
        onRequestClose={onClose}
      >
        {renderContent()}
      </Modal>
    );
  }

  if (!visible) return null;
  return renderContent();
};

export default ModalWindow;