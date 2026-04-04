import React, { useEffect, useMemo } from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
  StyleSheet,
} from "react-native";
import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

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
  type: "info" | "success" | "error";
  title: string;
  description?: string;
  styles?: ToastStyles;
  iconSize?: number;
  onClose?: () => void;
  autoHide?: boolean;
  autoHideDuration?: number;
  actions?: React.ReactNode;
}

interface AlertTypeIconProps {
  type: "info" | "success" | "error";
  size: number;
}

const AlertTypeIcon: React.FC<AlertTypeIconProps> = ({ type, size }) => {
  switch (type) {
    case "success":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <G clipPath="url(#clip0_success)">
            <Path
              d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM12 22.5C6.21094 22.5 1.5 17.7891 1.5 12C1.5 6.21094 6.21094 1.5 12 1.5C17.7891 1.5 22.5 6.21094 22.5 12C22.5 17.7891 17.7891 22.5 12 22.5ZM15.7119 7.75781L10.4093 13.0605L8.28806 10.9395C7.70212 10.3536 6.7515 10.3536 6.16687 10.9395C5.58094 11.5254 5.58094 12.4761 6.16687 13.0607L9.34856 16.2424C9.933 16.8283 10.8838 16.8283 11.4698 16.2424L17.8331 9.879C18.4191 9.29306 18.4191 8.34244 17.8331 7.75781C17.2485 7.17188 16.2979 7.17188 15.7119 7.75781Z"
              fill="black"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_success">
              <Rect width="24" height="24" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      );

    case "error":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 23C14.1756 23 16.3023 22.3549 18.1113 21.1462C19.9202 19.9375 21.3301 18.2195 22.1627 16.2095C22.9952 14.1995 23.2131 11.9878 22.7886 9.85401C22.3642 7.72022 21.3166 5.76021 19.7782 4.22183C18.2398 2.68345 16.2798 1.6358 14.146 1.21137C12.0122 0.786929 9.80047 1.00477 7.79048 1.83733C5.78049 2.66989 4.06253 4.07979 2.85383 5.88873C1.64514 7.69767 1 9.82441 1 12C1.00344 14.9163 2.16347 17.7122 4.22563 19.7744C6.28778 21.8365 9.08367 22.9966 12 23ZM12 3.00001C13.78 3.00001 15.5201 3.52785 17.0001 4.51678C18.4802 5.50571 19.6337 6.91132 20.3149 8.55585C20.9961 10.2004 21.1743 12.01 20.8271 13.7558C20.4798 15.5016 19.6226 17.1053 18.364 18.364C17.1053 19.6226 15.5016 20.4798 13.7558 20.8271C12.01 21.1743 10.2004 20.9961 8.55585 20.3149C6.91131 19.6337 5.50571 18.4802 4.51677 17.0001C3.52784 15.5201 3 13.78 3 12C3.00265 9.61387 3.95171 7.32622 5.63896 5.63897C7.32622 3.95171 9.61386 3.00265 12 3.00001ZM8.293 14.293L10.586 12L8.293 9.707C8.11084 9.5184 8.01005 9.2658 8.01233 9.0036C8.0146 8.74141 8.11977 8.49059 8.30518 8.30519C8.49059 8.11978 8.7414 8.01461 9.0036 8.01233C9.2658 8.01005 9.5184 8.11085 9.707 8.293L12 10.586L14.293 8.293C14.4816 8.11085 14.7342 8.01005 14.9964 8.01233C15.2586 8.01461 15.5094 8.11978 15.6948 8.30519C15.8802 8.49059 15.9854 8.74141 15.9877 9.0036C15.99 9.2658 15.8892 9.5184 15.707 9.707L13.414 12L15.707 14.293C15.8025 14.3853 15.8787 14.4956 15.9311 14.6176C15.9835 14.7396 16.0111 14.8708 16.0123 15.0036C16.0134 15.1364 15.9881 15.2681 15.9378 15.391C15.8875 15.5139 15.8133 15.6255 15.7194 15.7194C15.6255 15.8133 15.5139 15.8875 15.391 15.9378C15.2681 15.9881 15.1364 16.0134 15.0036 16.0123C14.8708 16.0111 14.7396 15.9835 14.6176 15.9311C14.4956 15.8787 14.3852 15.8025 14.293 15.707L12 13.414L9.707 15.707C9.5184 15.8892 9.2658 15.99 9.0036 15.9877C8.7414 15.9854 8.49059 15.8802 8.30518 15.6948C8.11977 15.5094 8.0146 15.2586 8.01233 14.9964C8.01005 14.7342 8.11084 14.4816 8.293 14.293Z"
            fill="black"
          />
        </Svg>
      );

    case "info":
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <G clipPath="url(#clip0_info)">
            <Path
              d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
              fill="#231F20"
            />
            <Path
              d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z"
              fill="#231F20"
            />
            <Path
              d="M12 10C11.7348 10 11.4804 10.1054 11.2929 10.2929C11.1054 10.4804 11 10.7348 11 11V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V11C13 10.7348 12.8946 10.4804 12.7071 10.2929C12.5196 10.1054 12.2652 10 12 10Z"
              fill="#231F20"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_info">
              <Rect width="24" height="24" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      );
  }
};

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

  const styles = useMemo(
    () =>
      StyleSheet.create({
        toastContainer: {
          position: "absolute",
          top: theme.spacing.xl,
          left: theme.spacing.xl,
          right: theme.spacing.xl,
          zIndex: 10000,
          alignItems: "center",
          pointerEvents: "box-none" as const,
        },
        toastInner: {
          backgroundColor: isDark
            ? theme.colors.toastBackgroundDark
            : theme.colors.toastBackground,
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
          borderColor: isDark
            ? theme.colors.toastBorderDark
            : theme.colors.toastBorder,
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
          backgroundColor: isDark
            ? theme.colors.toastCloseBgDark
            : theme.colors.toastCloseBg,
        },
        closeText: {
          fontSize: 24,
          color: isDark
            ? theme.colors.modalCloseTextDark
            : theme.colors.modalCloseText,
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
          color: isDark
            ? theme.colors.toastDescriptionDark
            : theme.colors.toastDescription,
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
      }),
    [theme, isDark]
  );

  useEffect(() => {
    if (autoHide && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDuration, onClose]);

  return (
    <View style={[styles.toastContainer, customStyles.toastContainer]}>
      <View style={[styles.toastInner, customStyles.toastInner]}>
        {onClose && (
          <TouchableOpacity style={[styles.close, customStyles.close]} onPress={onClose}>
            <Text style={[styles.closeText, customStyles.closeText]}>×</Text>
          </TouchableOpacity>
        )}

        <View style={[styles.box, customStyles.box]}>
          <View style={[styles.icon, customStyles.icon]}>
            <AlertTypeIcon type={type} size={iconSize} />
          </View>

          <View style={[styles.content, customStyles.content]}>
            <Text style={[styles.titleText, customStyles.titleText]}>{title}</Text>

            {description && (
              <Text style={[styles.descriptionText, customStyles.descriptionText]}>
                {description}
              </Text>
            )}

            {actions && <View style={[styles.actions, customStyles.actions]}>{actions}</View>}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Toast;