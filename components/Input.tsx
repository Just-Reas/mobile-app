import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {restyleTheme} from "@/constants/restyle-theme";

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    require?: boolean;
    secureText?: boolean;
    multiLine?: boolean,
    numberOfLines?: number;
};

export function Input({value, onChange, placeholder, require = false, secureText = false, multiLine = false, numberOfLines = 1 }: Props) {
    return (<View>
        <TextInput style={{
            color: restyleTheme.colors.text,
            backgroundColor: restyleTheme.colors.primaryBg,
            borderColor: restyleTheme.colors.borderAccent,
            borderRadius: restyleTheme.borderRadii.r20,
            borderWidth: restyleTheme.borderWidths.m,
            paddingHorizontal: restyleTheme.spacing.m,
            paddingVertical: restyleTheme.spacing.l,
            fontWeight: 600,
            fontSize: restyleTheme.textVariants.input.fontSize,
            margin: restyleTheme.spacing.l,
        }}
                    placeholderTextColor={restyleTheme.colors.placeholderText}
                    onChangeText={onChange}
                    secureTextEntry={secureText}
                    multiline={multiLine}
                    numberOfLines={numberOfLines}
                    />

        {value ? null :
            <TouchableOpacity activeOpacity={1} onPress={() => {}}
                style={{
                    position: "absolute",
                    top: 10,
                    left: 15,
                    zIndex: 1,
                    flexDirection: "row"}}>

                <Text style={{marginVertical: 19,
                    paddingLeft: restyleTheme.spacing.l,
                    fontFamily: "System",
                    color: restyleTheme.colors.placeholderText,
                    paddingVertical: 0,
                    fontWeight: 600,
                    fontSize: restyleTheme.textVariants.input.fontSize,}}>
                    {placeholder}</Text>

                {require && (<Text style={{
                            marginVertical: restyleTheme.spacing.py19,
                            fontFamily: "Barlow-Regular",
                            fontSize: 21,
                            color: "#ff0004",
                            marginLeft: 3}}>*</Text>)}
        </TouchableOpacity>}
    </View>)
}
