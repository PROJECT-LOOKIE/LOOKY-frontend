import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface NextButtonProps {
  onPress: () => void;
  text: string;
}

export default function NextButton({ onPress, text }: NextButtonProps) {
  return (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
      <Text style={styles.nextButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: "#CCFF66",
    height: 52,
    borderWidth: 2,
    borderColor: "#121212",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#121212",
  },
});
