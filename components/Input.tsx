import {
    Image, ImageSourcePropType, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback
} from "react-native";
import {Box, useAppTheme} from "@/hooks/restyle";

type Props = {
    value: string;
    secureTextEntry?: boolean;
    iconPath?: ImageSourcePropType;
    onPress?: (value: string) => void;
    placeholder?: string;
    multiline?: boolean;
    numberOfLines?: number;
}

const InputField = ({
                        value, iconPath, onPress, placeholder, multiline, secureTextEntry = false, numberOfLines = 1
                    }: Props) => {
    const theme = useAppTheme();

    const bgColor = theme.colors.secondaryBg
    const borderColor = theme.colors.borderAccent
    const placeholderColor = theme.colors.placeholderText
    const textColor = theme.colors.text

    return (
        <KeyboardAvoidingView enabled={true} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
            <TouchableWithoutFeedback>
                <Box
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        position: 'relative',
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                        borderRadius: theme.borderRadii.r20,
                        borderWidth: theme.borderWidths.bw2,
                        paddingVertical: theme.spacing.xs,
                        paddingHorizontal: theme.spacing.m,
                        minHeight: 55,
                    }}>

                    {iconPath && <Image source={iconPath} style={[{
                        width: theme.spacing.xl, height: theme.spacing.xl, marginLeft: theme.spacing.s
                    }]}/>}

                    <TextInput
                        value={value}
                        onChangeText={onPress}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={placeholderColor}
                        style={{width: "100%", color: textColor}}
                    />

                </Box>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>)
}

export default InputField;
