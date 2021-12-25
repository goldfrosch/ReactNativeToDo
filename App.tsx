import React, { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Category from "components/common/Category";
import TodoItem from "components/common/TodoItem";
import Input from "components/common/Input";

import { ITodos } from "types/TodosType";

import { categoryList } from "constants/CategoryList";
import { theme } from "styles/Pallete";

const STORAGE_KEY = "@todos";

export default function App() {
  const [status, setStatus] = useState<string>("Work");
  const [input, setInput] = useState<string>("");

  const [todo, setTodo] = useState<ITodos[]>([]);

  const loadTodoList = async () => {
    try {
      const res = await AsyncStorage.getItem(STORAGE_KEY);
      setTodo(JSON.parse(res || "[]"));
    } catch (e) {
      console.log(e);
    }
  };

  const saveTodoList = async (todos: ITodos[]) => {
    setTodo(todos);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    setInput("");
  };

  const editDoneTodoList = (item: ITodos) => {
    let prevList: ITodos[] = [...todo];
    prevList[prevList.length - item.id - 1].isDone = !item.isDone;

    saveTodoList(prevList);
  };

  const removeTodoList = (item: ITodos) => {
    Alert.alert("경고", "정말로 삭제하시겠습니까?", [
      {
        text: "취소",
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          let prevList: ITodos[] = [...todo];
          prevList.splice(prevList.length - item.id - 1, 1);

          saveTodoList(prevList);
        },
      },
    ]);
    return;
  };

  const handleChangeCategory = (status: string) => {
    setStatus(status);
    setInput("");
  };

  const handleChangeText = (event: any) => {
    setInput(event);
  };

  const handleSubmit = async () => {
    if (input.length === 0) {
      return Alert.alert("경고", "내용이 비어있습니다");
    }

    let todoList = [...todo];
    todoList.unshift({
      id: todo.length,
      time: new Date(),
      content: input,
      isDone: false,
      type: status,
    });

    await saveTodoList(todoList);
  };

  useEffect(() => {
    loadTodoList();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {Object.keys(categoryList).map((data, key) => (
          <Category
            category={categoryList[data].status}
            status={status}
            onPress={() => handleChangeCategory(categoryList[data].status)}
            key={key}
          />
        ))}
      </View>
      <Input
        placeholder={categoryList[status].placeholder || "잘못된 접근"}
        value={input}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
      />
      <ScrollView>
        {todo
          .filter(data => data.type === status)
          .map((data, key) => (
            <TodoItem
              item={data}
              editItem={() => editDoneTodoList(data)}
              removeItem={() => removeTodoList(data)}
              key={key}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,

    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
});
