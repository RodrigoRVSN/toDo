import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { ItemWrapper } from "./ItemWrapper";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/Path.png";
import xIcon from "../assets/icons/X.png";
import { Task } from "./TasksList";

interface TaskItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({
  item,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [actualTask, setActualTask] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setActualTask(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, actualTask);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            numberOfLines={1}
            ref={textInputRef}
            style={
              item.done
                ? [styles.taskTextDone, isEditing && { width: "80%" }]
                : [styles.taskText, isEditing && { width: "80%" }]
            }
            value={actualTask}
            onChangeText={setActualTask}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      {/* TODO: fix edit task content */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={isEditing ? handleCancelEditing : handleStartEditing}
        >
          {isEditing ? <Image source={xIcon} /> : <Image source={editIcon} />}
        </TouchableOpacity>
        <View style={styles.taskDivider} />
        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          onPress={() => removeTask(item.id)}
          style={isEditing && { opacity: 0.2 }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
    width: "62%",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
    width: "62%",
  },
  taskDivider: {
    height: 30,
    width: 1,
    marginHorizontal: 20,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
  iconsContainer: {
    flexDirection: "row",
    marginRight: 30,
    alignItems: "center",
  },
});
