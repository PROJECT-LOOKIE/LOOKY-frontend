import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BackIcon from "../../assets/images/go.svg";
import { router } from "expo-router";

interface HeaderProps {
  stepText: string;
}

export default function Header({ stepText }: HeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <BackIcon width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.stepText}>{stepText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 35,
  },
  backButton: {
    marginTop: 12,
    marginBottom: 10,
  },
  stepText: {
    fontSize: 18,
    color: "#000000",
    marginTop: 10,
  },
});
