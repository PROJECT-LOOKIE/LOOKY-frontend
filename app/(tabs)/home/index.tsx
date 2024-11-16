import React, { useState } from "react";
import { ScrollView } from "react-native";
import Header from "../../../components/home/Header";
import WeatherInfo from "../../../components/home/WeatherInfo";
import Schedule from "../../../components/home/Schedule";

export default function TabOneScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date()); 

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