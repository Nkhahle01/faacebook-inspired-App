import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icons = [
  { name: "home", label: "Home" },
  { name: "search", label: "Search" },
  { name: "add-circle", label: "Add" },
  { name: "notifications", label: "Notifications" },
  { name: "person", label: "Profile" },
];

export default function Navbar({ activeTab, setActiveTab }) {
  const insets = useSafeAreaInsets();

  // navbar with icons and simple state update
  return (
    <View style={[styles.navContainer, { paddingBottom: insets.bottom + 10 }]}>
      <View style={styles.navBar}>
        {icons.map((item, index) => {
          const active = activeTab === item.label;
          const isCenter = index === 2;
          return (
            <TouchableOpacity
              key={item.label}
              onPress={() => setActiveTab(item.label)}
              style={isCenter ? styles.centerButton : styles.button}
            >
              <Ionicons
                name={item.name}
                size={isCenter ? 32 : 24}
                color={active ? "#3D9E9E" : "#B0BFBF"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 0,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 5,
    width: "100%",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
});
