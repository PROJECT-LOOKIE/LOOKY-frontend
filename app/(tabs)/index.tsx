import React, { useState } from "react";
import { ScrollView } from "react-native";
import Header from '../../components/home/Header'; 
import WeatherInfo from '../../components/home/WeatherInfo'; 
import Schedule from '../../components/home/Schedule'; 

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
