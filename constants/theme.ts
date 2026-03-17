import { createTheme } from "@shopify/restyle";
import { Platform } from "react-native";

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
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
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
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
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
    xs: 4,
    s: 8,
    m: 12,
    l: 20,
    xl: 24,
    xxl: 32,
    round: 999,
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
    defaults: {
      fontSize: 14,
      color: "textLight",
    },
  },

  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;