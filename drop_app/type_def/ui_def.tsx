import { LinkProps } from "expo-router";
import { PressableProps, TextProps } from "react-native";

type StylingClassName = {
    className?: string;
};

export type ButtonProps = LinkProps<string> & PressableProps & StylingClassName & {
    children: string;
}

