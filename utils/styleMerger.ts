import { StyleSheet } from 'react-native';

type StyleObject = { [key: string]: any };

export const mergeStyles = <T extends StyleObject>(
  themeStyles: T,
  customStyles: Partial<T> = {}
): T => {
  const result = { ...themeStyles };

  (Object.keys(themeStyles) as Array<keyof T>).forEach((key) => {
    const themeValue = themeStyles[key];
    const customValue = customStyles[key];

    if (customValue) {
      result[key] = StyleSheet.flatten([themeValue, customValue]) as T[keyof T];
    }
  });

  return result;
};