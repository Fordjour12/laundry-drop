// import React from "react";
import { TextInput, TextInputProps } from "react-native";

export type InputProps = TextInputProps & {
  className?: string;
};

export default function Input(props: InputProps) {
  const defaultStyle =
    "bg-transparent rounded-xl py-4 px-4 border-2 border-gray-500 text-black w-full placeholder:text-black";
  const { style, className, ...otherProps } = props;
  return (
    <TextInput
      {...otherProps}
      className={`${defaultStyle} ${className}`}
      style={[style]}
    />
  );
}
