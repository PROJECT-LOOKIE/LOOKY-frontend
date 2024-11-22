import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import Header from "../../../components/home/Header";
import WeatherInfo from "../../../components/home/WeatherInfo";
import Schedule from "../../../components/home/Schedule";
import { saveDataSecurely } from "@/utils/schedule/stroageUtills";

export default function TabOneScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date()); // 초기값은 오늘 날짜

  // selectedDate를 SecureStore에 저장하는 함수
  const saveDateToStorage = async (date: Date) => {
    try {
      await saveDataSecurely("date", date.toISOString()); // ISO 형식으로 저장
      console.log("Date 저장 성공:", date);
    } catch (error) {
      console.error("Date 저장 실패:", error);
    }
  };

  // 날짜가 변경될 때마다 SecureStore에 저장
  useEffect(() => {
    saveDateToStorage(selectedDate);
  }, [selectedDate]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header 컴포넌트 */}
      <Header
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedDayIndex={selectedDayIndex}
        setSelectedDayIndex={setSelectedDayIndex}
      />

      {/* WeatherInfo 컴포넌트 */}
      <WeatherInfo selectedDate={selectedDate} />

      {/* Schedule 컴포넌트 */}
      <Schedule />
    </ScrollView>
  );
}