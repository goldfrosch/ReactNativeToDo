import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

import { theme } from "styles/Pallete";
import { ITodos } from "types/TodosType";

interface TodoItemProps {
  item: ITodos;
  editItem: () => void;
  removeItem: () => void;
}
const TodoItem: React.FC<TodoItemProps> = ({ item, editItem, removeItem }) => {
  return (
    <View style={styles.item}>
      <Text
        style={{
          ...styles.text,
          color: item.isDone ? "grey" : "white",
          textDecorationLine: item.isDone ? "line-through" : "none",
        }}
      >
        {item.content}
      </Text>
      <View style={styles.option}>
        <TouchableOpacity onPress={editItem}>
          {item.isDone ? (
            <Fontisto name="checkbox-active" size={20} color="green" />
          ) : (
            <Fontisto name="checkbox-passive" size={20} color="black" />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={removeItem}>
          <Fontisto
            style={styles.optionItem}
            name="trash"
            color={theme.grey}
            size={21}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.itemColor,
    borderRadius: 15,

    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: 15,
    paddingHorizontal: 20,

    marginTop: 16,
  },
  text: {
    fontSize: 16,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionItem: {
    paddingLeft: 8,
  },
});

export default TodoItem;
