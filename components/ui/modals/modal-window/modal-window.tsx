import React, { useEffect, useRef } from "react";
import { getModalWindowTheme, ModalWindowThemeType } from "@/constants/theme";
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

const mergeModalStyles = (
  theme: ModalWindowThemeType,
  custom: ModalWindowStyles,
): ModalWindowThemeType => {
  const result: ModalWindowThemeType = {
    overlay: theme.overlay,
    modalWindowContainer: theme.modalWindowContainer,
    modalWindowInner: theme.modalWindowInner,
    close: theme.close,
    closeText: theme.closeText,
    content: theme.content,
  };

  const themeKeys = Object.keys(theme) as Array<keyof ModalWindowThemeType>;

  themeKeys.forEach((key) => {
    const themeStyle = theme[key];
    const customStyle = custom[key as keyof ModalWindowStyles];

    if (customStyle) {
      if (key === "closeText") {
        result[key] = {
          ...(themeStyle as TextStyle),
          ...(customStyle as TextStyle),
        } as any;
      } else {
        result[key] = {
          ...(themeStyle as ViewStyle),
          ...(customStyle as ViewStyle),
        } as any;
      }
    }
  });

  return result;
};

const ModalWindow: React.FC<ModalWindowProps> = ({
  children,
  styles: customStyles = {},
  visible = false,
  onClose,
  closeOnOutsideClick = true,
  showCloseButton = false,
}: ModalWindowProps) => {
  const colorScheme = useColorScheme();
  const theme = getModalWindowTheme(colorScheme === "dark" ? "dark" : "light");

  const mergedStyles = mergeModalStyles(theme, customStyles);

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
