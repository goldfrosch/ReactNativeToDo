import React from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "/styles/Pallete";

interface CategoryProps {
  status: string;
  category: string;
  onPress: () => void;
}

const Category: React.FC<CategoryProps> = ({ category, status, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <Text
        style={{
          ...styles.btnText,
          color: status === category ? "white" : theme.grey,
        }}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
});

export default Category;
