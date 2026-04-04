import React, { useEffect, useMemo, useRef } from "react";
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  Animated,
  Modal,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

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

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flex: 1,
        },
        overlay: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.overlayLight,
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
          backgroundColor: theme.colors.dialogBackground,
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
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          position: "relative",
          borderWidth: 1,
          borderColor: theme.colors.dialogBorder,
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
          backgroundColor: theme.colors.modalCloseBg,
        },
        closeText: {
          fontSize: 24,
          color: theme.colors.modalCloseText,
          fontWeight: "bold",
        },
        content: {
          width: "100%",
        },
      }),
    [theme]
  );

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
  }, [visible, scaleAnim, opacityAnim]);

  const handleOverlayPress = () => {
    if (closeOnOutsideClick && onClose) {
      onClose();
    }
  };

  const renderContent = () => (
    <View style={styles.root}>
      <TouchableOpacity
        style={[styles.overlay, customStyles.overlay, { opacity: opacityAnim }]}
        activeOpacity={1}
        onPress={handleOverlayPress}
      />

      <View
        style={[styles.modalWindowContainer, customStyles.modalWindowContainer]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            styles.modalWindowInner,
            customStyles.modalWindowInner,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {showCloseButton && onClose && (
            <TouchableOpacity style={[styles.close, customStyles.close]} onPress={onClose}>
              <Text style={[styles.closeText, customStyles.closeText]}>×</Text>
            </TouchableOpacity>
          )}

          <View style={[styles.content, customStyles.content]}>{children}</View>
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