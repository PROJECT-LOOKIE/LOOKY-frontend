import React, { useState } from "react";
import { ScrollView } from "react-native";
import Header from '../../components/home/Header'; // 헤더 컴포넌트
import WeatherInfo from '../../components/home/WeatherInfo'; // 날씨 정보 컴포넌트
import Schedule from '../../components/home/Schedule'; // 오늘의 일정 컴포넌트

export default function TabOneScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header 컴포넌트 */}
      <Header selectedDayIndex={selectedDayIndex} setSelectedDayIndex={setSelectedDayIndex} />
      
      {/* WeatherInfo 컴포넌트 */}
      <WeatherInfo />

      {/* Schedule 컴포넌트 */}
      <Schedule />
    </ScrollView>
  );
}
