import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface LevelDescriptionProps {
  level: number;
  descriptions: Record<number, string>;
}

export default function LevelDescription({ level, descriptions }: LevelDescriptionProps) {
  return (
    <View style={styles.descriptionBox}>
      <Text style={styles.descriptionText}>{descriptions[level]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionBox: {
    width: "100%",
    backgroundColor: "#C6FF6B",
    borderRadius: 8,
    padding: 15,
    borderWidth: 2,
    borderColor: "#121212",
    marginBottom: 140,
  },
  descriptionText: {
    fontSize: 16,
    color: "#121212",
    textAlign: "center",
    fontWeight: "bold",
  },
});
