import React, { useEffect, useRef } from "react";
import { ModalWindowTheme } from "@/constants/theme";
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

export interface ModalWindowStyles {
  modalWindowContainer?: ViewStyle;
  modalWindowInner?: ViewStyle;
  close?: ViewStyle;
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
}: ModalWindowProps) => {
  const colorScheme = useColorScheme();
  const theme =
    colorScheme === "dark" ? ModalWindowTheme.dark : ModalWindowTheme.light;

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

  const mergedStyles = (
    Object.keys(theme) as Array<keyof ModalWindowStyles>
  ).reduce((acc, key) => {
    const themeStyle = theme[key];
    const customStyle = customStyles[key];

    if (!themeStyle) return acc;

    return {
      ...acc,
      [key]: customStyle ? { ...themeStyle, ...customStyle } : themeStyle,
    };
  }, {} as ModalWindowStyles);

  const handleOverlayPress = () => {
    console.log("Overlay pressed");
    if (closeOnOutsideClick && onClose) {
      onClose();
    }
  };

  const renderContent = () => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[theme.overlay, mergedStyles.overlay, { opacity: opacityAnim }]}
        activeOpacity={1}
        onPress={handleOverlayPress}
      />

      <View
        style={[theme.modalWindowContainer, mergedStyles.modalWindowContainer]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            theme.modalWindowInner,
            mergedStyles.modalWindowInner,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {showCloseButton && onClose && (
            <TouchableOpacity
              style={[theme.close, mergedStyles.close]}
              onPress={onClose}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: colorScheme === "dark" ? "#fff" : "#000",
                  fontWeight: "bold",
                }}
              >
                ×
              </Text>
            </TouchableOpacity>
          )}

          <View style={[theme.content, mergedStyles.content]}>{children}</View>
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
