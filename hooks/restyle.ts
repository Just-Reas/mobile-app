import { createBox, createText, useTheme } from "@shopify/restyle";
import type { AppTheme } from "../constants/restyle-theme";

export const Box = createBox<AppTheme>();
export const Text = createText<AppTheme>();
export const useAppTheme = () => useTheme<AppTheme>();
