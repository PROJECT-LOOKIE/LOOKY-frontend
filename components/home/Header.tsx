import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// Props 타입 정의
interface HeaderProps {
  selectedDayIndex: number; // selectedDayIndex는 숫자형
  setSelectedDayIndex: (index: number) => void; // setSelectedDayIndex는 숫자를 인자로 받는 함수
}

export default function Header({ selectedDayIndex, setSelectedDayIndex }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.monthText}>2024년 10월</Text>
      <View style={styles.weekContainer}>
        {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => {
          const isSelected = index === selectedDayIndex;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dayButton, isSelected && styles.selectedDay]}
              onPress={() => setSelectedDayIndex(index)}
            >
              <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                {day}
              </Text>
              <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                {7 + index}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000", 
    paddingBottom: 16, 
    paddingHorizontal: 20, 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "100%", 
    paddingTop: 74,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 64, 
    alignItems: "center",
  },
  dayButton: {
    alignItems: "center",
    justifyContent: "center", 
    backgroundColor: "#4E4E4E", 
    borderRadius: 37, 
    width: 40, 
    height: 60, 
  },
  selectedDay: {
    backgroundColor: "#ccff99", 
    borderRadius: 37, 
  },
  dayText: {
    fontSize: 14,
    color: "#000", 
    marginBottom: 6, 
  },
  selectedDayText: {
    color: "#000", 
    fontSize: 14, 
  },
  dateText: {
    fontSize: 20,
    color: "#000", 
  },
  selectedDateText: {
    color: "#000", 
  },
});
