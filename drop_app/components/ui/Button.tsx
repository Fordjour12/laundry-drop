import { ButtonProps, TextFieldProps } from "@/type_def/ui_def";
import { Link } from "expo-router";
import { Pressable, Text } from "react-native";


export default function Button(props: ButtonProps) {
    const { style, className, children, ...otherProps } = props;

    const defaultStyles = "bg-teal-600 p-4 mx-4 rounded-lg";

    return (
        <Link
            {...otherProps}
            asChild

            style={[style]}
            className={`${defaultStyles} ${className}`}
        >
            <Pressable>
                <Text className={`${className}`} style={[style]}> {children} </Text>
            </Pressable>
        </Link>
    );
}
