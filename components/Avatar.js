import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Avatar({ size = 50, source }) {
  // reusable avatar img
  return (
    <Image
      source={source}
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: "#ffffff",
    backgroundColor: "#eaeaea",
  },
});
