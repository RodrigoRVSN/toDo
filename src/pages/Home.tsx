import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const equalTask = tasks.find((task) => task.title === newTaskTitle);

    if (equalTask) {
      Alert.alert(
        "Tarefa já existe",
        "Ei, essa tarefa já existe! Crie uma tarefa com nome diferente."
      );
      return;
    }
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((oldState) => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const foundItem = updatedTasks.find((task) => task.id === id);
    if (!foundItem) return;
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Confirmar exclusão", "Deseja mesmo excluir a tarefa?", [
      {
        text: "cancelar",
        style: "cancel",
      },
      { text: "Sim, remover", onPress: () => filterTasks(id) },
    ]);
  }

  function filterTasks(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const editedTasks = tasks.map((task) => ({ ...task }));
    const foundItem = editedTasks.find((task) => task.id === taskId);
    if (!foundItem) return;
    foundItem.title = taskNewTitle;
    setTasks(editedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
