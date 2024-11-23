import React, { useState, useEffect } from "react";
import { Alert, ScrollView, Share } from "react-native";
import Header from "../../../components/home/Header";
import WeatherInfo from "../../../components/home/WeatherInfo";
import Schedule from "../../../components/home/Schedule";
import { deleteDataSecurely, getDataSecurely, saveDataSecurely } from "@/utils/schedule/stroageUtills";

export default function TabOneScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  // selectedDate를 SecureStore에 저장하는 함수
  const saveDateToStorage = async (date: Date) => {
    try {
      await saveDataSecurely("date", date.toISOString()); 
      console.log("Date 저장 성공:", date);
    } catch (error) {
      console.error("Date 저장 실패:", error);
    }
  };

  // 날짜가 변경될 때마다 SecureStore에 저장
  useEffect(() => {
    saveDateToStorage(selectedDate);
  }, [selectedDate]);

  // 공유 모달 실행 함수
  const showShareModal = async () => {
    try {
      const message = await getDataSecurely("shareMessage"); 
      if (message) {
        await Share.share({
          message: message, 
        });
        await deleteDataSecurely("shareMessage"); // 공유 후 삭제
      }
    } catch (error) {
      Alert.alert("오류", "공유 모달을 띄우는 중 문제가 발생했습니다.");
      console.error(error);
    }
  };

  useEffect(() => {
    showShareModal();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F4F8F3" }}>
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