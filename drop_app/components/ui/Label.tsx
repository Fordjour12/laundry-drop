import React from "react";
import { Text } from "react-native";

type Lab = {
  children: String;
  className?: String;
};

export default function Label({ children, className }: Lab) {
  const defaultClassName = "text-black  mb-2";
  return <Text className={`${defaultClassName} ${className}`}>{children}</Text>;
}
