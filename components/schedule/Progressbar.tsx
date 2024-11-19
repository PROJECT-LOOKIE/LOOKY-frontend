import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  activeStep: number; 
}

export default function ProgressBar({ activeStep }: ProgressBarProps) {
  return (
    <View style={styles.progressBar}>
      <View style={[styles.progressActive, { flex: activeStep }]} />
      <View style={[styles.progressInactive, { flex: 3 - activeStep }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 5,
    marginBottom: 47,
    marginHorizontal: -20,
  },
  progressActive: {
    backgroundColor: "#C6FF6B",
    height: "100%",
  },
  progressInactive: {
    backgroundColor: "#121212",
    height: "100%",
  },
});
