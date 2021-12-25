import React from "react";

import { StyleSheet, TextInput } from "react-native";
import type { KeyboardType, ReturnKeyType } from "react-native";

interface TextInputProps {
  placeholder: string;
  keyboard?: KeyboardType;
  returnKey?: ReturnKeyType;
  value: string;
  onChangeText: (event: any) => void;
  onSubmitEditing: () => void;
}
const Input: React.FC<TextInputProps> = ({
  placeholder,
  keyboard,
  returnKey,
  value,
  onChangeText,
  onSubmitEditing,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      keyboardType={keyboard || "default"}
      returnKeyType={returnKey || "done"}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      autoCapitalize="sentences"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    fontSize: 12,

    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 16,
  },
});

export default Input;
