import {Box, useAppTheme} from "@/hooks/restyle";
import {ThemeProvider} from "@shopify/restyle";
import {
    Image, ImageSourcePropType, KeyboardAvoidingView, Platform, StyleProp, TextInput, ViewStyle
} from "react-native";
import React from "react";

type Props = {
    value: string;
    onPress: (value: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    iconPath?: ImageSourcePropType;
    multiline?: boolean;
    numberOfLines?: number;
    style?: StyleProp<ViewStyle>;
}

const Input = ({value, onPress, placeholder, secureTextEntry, iconPath, multiline, numberOfLines, style}: Props) => {
    const theme = useAppTheme();

    return (<KeyboardAvoidingView enabled={true} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Box margin="s"
                 paddingVertical="xxxs"
                 paddingHorizontal="m"
                 borderRadius="r30"
                 borderColor="inputBorder"
                 backgroundColor="inputBg"
                 borderWidth={4}
                 flexDirection="row"
                 style={style}>

                {iconPath && <Image source={iconPath} alt="icon"
                                    style={{width: 20, height: 20, marginRight: 2, alignSelf: 'center',}}/>}

                <TextInput placeholder={placeholder}
                           style={{
                               color: theme.colors.text,
                               fontSize: theme.textVariants.input.fontSize,
                               lineHeight: theme.textVariants.input.lineHeight,
                               alignItems: 'stretch',
                               width: "100%"
                           }}
                           placeholderTextColor={theme.colors.placeholderTextColor}
                           value={value}
                           onChangeText={onPress}
                           multiline={multiline}
                           secureTextEntry={secureTextEntry}
                           numberOfLines={numberOfLines}/>

            </Box>
        </KeyboardAvoidingView>)
}

export default Input;
