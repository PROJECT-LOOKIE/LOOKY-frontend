import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Schedule() {
  return (
    <View style={styles.scheduleSection}>
      <Text style={styles.scheduleTitle}>오늘의 일정</Text>
      <View style={styles.scheduleBox}>
        <View style={styles.plusIconContainer}>
          <Text style={styles.plusIcon}>+</Text>
        </View>
        <Text style={styles.noScheduleText}>
          아직 일정이 없네요,{"\n"}일정을 추가해보세요!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  scheduleBox: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 20,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIconContainer: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    fontSize: 24,
    color: "#000",
  },
  noScheduleText: {
    color: "#C6FF6B",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
});
