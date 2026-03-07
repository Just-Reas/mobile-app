import { createTheme } from "@shopify/restyle";
import { Platform, TextStyle, ViewStyle } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const theme = createTheme({
  colors: {
    textLight: Colors.light.text,
    backgroundLight: Colors.light.background,
    tintLight: Colors.light.tint,
    iconLight: Colors.light.icon,
    tabIconDefaultLight: Colors.light.tabIconDefault,
    tabIconSelectedLight: Colors.light.tabIconSelected,

    textDark: Colors.dark.text,
    backgroundDark: Colors.dark.background,
    tintDark: Colors.dark.tint,
    iconDark: Colors.dark.icon,
    tabIconDefaultDark: Colors.dark.tabIconDefault,
    tabIconSelectedDark: Colors.dark.tabIconSelected,

    overlayLight: "rgba(0, 0, 0, 0.5)",
    overlayDark: "rgba(0, 0, 0, 0.7)",

    dialogBackground: "#ffffff",
    dialogBackgroundDark: "#2a2a2a",
    dialogBorder: "#e6e6e6",
    dialogBorderDark: "#404040",
    dialogTitle: "#30C04F",
    dialogDescription: "#616161",
    dialogDescriptionDark: "#e6e6e6",

    buttonBackground: "#e6e6e6",
    buttonText: "#000000",

    modalBackground: "#ffffff",
    modalBackgroundDark: "#2a2a2a",
    modalCloseBg: "rgba(0, 0, 0, 0.05)",
    modalCloseBgDark: "rgba(255, 255, 255, 0.1)",
    modalCloseText: "#000000",
    modalCloseTextDark: "#ffffff",
    modalShadow: "#000000",

    toastBackground: "#ffffff",
    toastBackgroundDark: "#2a2a2a",
    toastBorder: "#e6e6e6",
    toastBorderDark: "#404040",
    toastCloseBg: "rgba(0, 0, 0, 0.05)",
    toastCloseBgDark: "rgba(255, 255, 255, 0.1)",
    toastTitle: "#000000",
    toastTitleDark: "#ffffff",
    toastDescription: "#616161",
    toastDescriptionDark: "#e6e6e6",

    transparent: "transparent",
  },

  spacing: {
    xs: 2,
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    xxl: 20,
    xxxl: 24,
  },

  borderRadii: {
    s: 8,
    m: 12,
    l: 20,
    xl: 999,
  },

  textVariants: {
    title: {
      fontSize: 24,
      textAlign: "center",
      color: "dialogTitle",
    },
    description: {
      fontSize: 16,
      textAlign: "center",
      color: "dialogDescription",
    },
    button: {
      fontSize: 16,
      textAlign: "center",
      color: "buttonText",
    },
    toastTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "toastTitle",
    },
    toastDescription: {
      fontSize: 14,
      color: "toastDescription",
    },
    modalClose: {
      fontSize: 24,
      fontWeight: "bold",
    },
    defaults: {},
  },

  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;

export const createBlurStyles = (isVisible: boolean = true): ViewStyle => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: Platform.select({
    web: "blur(8px)",
    default: undefined,
  }),
  display: isVisible ? "flex" : "none",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9998,
});

export type AlertWindowThemeMode = "light" | "dark";

export type AlertWindowThemeType = {
  overlay: ViewStyle;
  AlertWindowContainer: ViewStyle;
  AlertWindowInner: ViewStyle;
  box: ViewStyle;
  title: TextStyle;
  titleText: TextStyle;
  description: TextStyle;
  descriptionText: TextStyle;
  buttonBox: ViewStyle;
  closeButton: ViewStyle;
  icon: ViewStyle;
  cancelButton: ViewStyle;
  cancelButtonText: TextStyle;
  successButton: ViewStyle;
  successButtonText: TextStyle;
  actions: ViewStyle;
};

export type ModalWindowThemeType = {
  overlay: ViewStyle;
  modalWindowContainer: ViewStyle;
  modalWindowInner: ViewStyle;
  close: ViewStyle;
  closeText: TextStyle;
  content: ViewStyle;
};

export type ModalWindowThemeMode = "light" | "dark";

export type DialogToastThemeType = {
  dialogToastContainer: ViewStyle;
  dialogToastInner: ViewStyle;
  close: ViewStyle;
  closeText: TextStyle;
  box: ViewStyle;
  icon: ViewStyle;
  title: ViewStyle;
  titleText: TextStyle;
  description: ViewStyle;
  descriptionText: TextStyle;
  content: ViewStyle;
  actions: ViewStyle;
};

export type DialogToastThemeMode = "light" | "dark";

export const getAlertWindowTheme = (
  mode: AlertWindowThemeMode = "light",
): AlertWindowThemeType => {
  const isDark = mode === "dark";

  return {
    overlay: {
      ...createBlurStyles(true),
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
    },
    AlertWindowContainer: {
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
      backgroundColor: "#00000000",
      width: "90%",
      padding: 6,
      alignSelf: "center",
      opacity: 1,
      transform: [{ scale: 1 }],
    },
    AlertWindowInner: {
      display: "flex",
      maxHeight: 300,
      width: "90%",
      flexDirection: "column",
      alignSelf: "center",
      gap: 6,
      borderWidth: 4,
      borderColor: "#e6e6e6",
      backgroundColor: "#ffffff",
      borderRadius: 8,
      padding: 8,
    },
    box: {
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
    },
    title: {
      textAlign: "center",
      alignItems: "center",
      gap: 8,
    },
    titleText: {
      fontSize: 24,
      textAlign: "center",
      alignItems: "center",
      gap: 8,
      color: "#30C04F",
    },
    description: {
      textAlign: "center",
      alignItems: "center",
    },
    descriptionText: {
      fontSize: 16,
      textAlign: "center",
      alignItems: "center",
      gap: 8,
      color: isDark ? "#e6e6e6" : "#616161",
    },
    buttonBox: {
      marginTop: 12,
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 16,
      paddingRight: 16,
    },
    closeButton: {
      width: "100%",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 12,
      paddingRight: 12,
    },
    icon: {},
    cancelButton: {
      flex: 1,
      maxWidth: 120,
      display: "flex",
      alignItems: "center",
      borderWidth: 4,
      borderColor: "#e6e6e6",
      backgroundColor: "#e6e6e6",
      borderRadius: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 4,
      paddingBottom: 4,
    },
    cancelButtonText: {
      display: "flex",
      fontSize: 16,
      color: "#000000",
    },
    successButton: {
      flex: 1,
      maxWidth: 120,
      display: "flex",
      alignItems: "center",
      borderWidth: 4,
      borderColor: "#e6e6e6",
      backgroundColor: "#e6e6e6",
      borderRadius: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 4,
      paddingBottom: 4,
    },
    successButtonText: {
      display: "flex",
      fontSize: 16,
      color: "#000000",
    },
    actions: {
      marginTop: 8,
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
    },
  };
};

export const getModalWindowTheme = (
  mode: AlertWindowThemeMode = "light",
): ModalWindowThemeType => {
  const isDark = mode === "dark";

  return {
    overlay: {
      ...createBlurStyles(true),
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
      padding: 20,
    },
    modalWindowInner: {
      backgroundColor: isDark ? "#2a2a2a" : "#ffffff",
      borderRadius: 12,
      padding: 20,
      maxWidth: 500,
      width: "100%",
      maxHeight: "80%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDark ? 0.5 : 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      position: "relative",
      ...(isDark ? { borderWidth: 1, borderColor: "#404040" } : {}),
    },
    close: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 10000,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      backgroundColor: isDark
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.05)",
    },
    closeText: {
      fontSize: 24,
      color: isDark ? "#ffffff" : "#000000",
      fontWeight: "bold",
    },
    content: {
      width: "100%",
    },
  };
};

export const getDialogToastTheme = (
  mode: AlertWindowThemeMode = "light",
): DialogToastThemeType => {
  const isDark = mode === "dark";

  return {
    dialogToastContainer: {
      position: "absolute",
      top: 50,
      left: 20,
      right: 20,
      zIndex: 10000,
      alignItems: "center",
      pointerEvents: "box-none",
    },
    dialogToastInner: {
      backgroundColor: isDark ? "#2a2a2a" : "#ffffff",
      borderRadius: 12,
      padding: 16,
      minWidth: 300,
      maxWidth: 400,
      shadowColor: "#000",
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
      borderColor: isDark ? "#404040" : "#e6e6e6",
    },
    close: {
      position: "absolute",
      top: 8,
      right: 8,
      zIndex: 10001,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: isDark
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.05)",
    },
    closeText: {
      fontSize: 24,
      color: isDark ? "#ffffff" : "#000000",
      fontWeight: "bold",
      lineHeight: 24,
      textAlign: "center",
    },
    box: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    icon: {
      marginRight: 8,
    },
    title: {
      flex: 1,
    },
    titleText: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
    },
    description: {
      marginTop: 4,
    },
    descriptionText: {
      fontSize: 14,
      color: isDark ? "#e6e6e6" : "#616161",
    },
    content: {
      flex: 1,
      flexDirection: "column",
    },
    actions: {
      marginTop: 8,
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 8,
    },
  };
};
