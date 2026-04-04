import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";

export default function StoryItem({ item }) {
  // each story item has avatar and label
  const isAdd = item.type === "add";

  const handlePress = () => {
    if (isAdd) {
      Alert.alert("Story uploaded");
    }
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={handlePress}>
      <View style={isAdd ? styles.addStoryBorder : styles.storyBorder}>
        <Avatar size={62} source={{ uri: item.image }} />
        {isAdd && (
          <View style={styles.addIcon}>
            <Ionicons name="add" size={18} color="#fff" />
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 10,
    alignItems: "center",
  },
  storyBorder: {
    borderWidth: 2,
    borderColor: "#5BBCBB",
    borderRadius: 40,
    padding: 2,
  },
  addStoryBorder: {
    borderWidth: 2,
    borderColor: "#5BBCBB",
    borderRadius: 40,
    padding: 2,
    position: "relative",
  },
  addIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3D9E9E",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -4,
    bottom: -4,
  },
  name: {
    marginTop: 4,
    maxWidth: 70,
    textAlign: "center",
    color: "#1E2A2A",
    fontSize: 12,
  },
});
