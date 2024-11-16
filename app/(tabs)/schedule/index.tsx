import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Schedule() {
  return (
    <View style={styles.backSection}>
      <View style={styles.backIconContainer}>
        <Text style={styles.backIcon}>{"<"} </Text>
      </View>
      <View style={styles.scheduleSection}>
        <Text style={styles.scheduleTitle}>어떤 일정인가요?</Text>
        <Text style={styles.scheduleText}>일정의 이름을 적어주세요</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backSection: {
    flex: 1,
    backgroundColor: "#fff", 
    padding: 20, 
  },
  backIconContainer: {
    marginBottom: 20, 
  },
  scheduleSection: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 10,
  },
  scheduleText: {
    fontSize: 16,
    color: "#121212",
    marginBottom: 10,
  },
  backIcon: {
    fontSize: 24,
    color: "#000",
  },
});