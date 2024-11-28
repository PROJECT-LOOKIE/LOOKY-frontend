import React, { useState, useEffect } from "react";
import { Alert, ScrollView, Share } from "react-native";
import { useLocalSearchParams } from "expo-router"; 
import Header from "../../../components/home/Header";
import WeatherInfo from "../../../components/home/WeatherInfo";
import Schedule from "../../../components/home/Schedule";
import NewSchedule from "../../../components/home/Newschedule";
import {
  deleteDataSecurely,
  getDataSecurely,
} from "@/utils/schedule/stroageUtills";

export default function TabOneScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isScheduleAvailable, setIsScheduleAvailable] = useState(false);
  const [scheduleData, setScheduleData] = useState<any>(null);

  const { showNewSchedule, selectedDate: paramDate } = useLocalSearchParams();

  useEffect(() => {
    if (paramDate) {
      console.log("Received paramDate:", paramDate);
      const [year, month, day] = (paramDate as string).split("-").map(Number);
      const parsedDate = new Date(year, month - 1, day);
      setSelectedDate(parsedDate);
      console.log("Selected Date set from paramDate:", parsedDate);
    }
  }, [paramDate]);

  useEffect(() => {
    console.log("Current selectedDate:", selectedDate);
  }, [selectedDate]);

  const checkScheduleExists = async (date: Date) => {
    try {
      const accessToken = await getDataSecurely("accessToken");
      if (!accessToken) {
        Alert.alert("오류", "엑세스 토큰이 없습니다.");
        return false;
      }

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const requestUrl = `https://lookie.store/api/v1/schedule?year=${year}&month=${month}&day=${day}`;

      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error(
          `스케줄 확인 오류: ${response.status} - ${response.statusText}`
        );
        return false;
      }

      const scheduleList = await response.json();

      if (!scheduleList.payload || scheduleList.payload.length === 0) {
        setScheduleData(null);
        return false;
      }

      const scheduleItem =
        scheduleList.payload[scheduleList.payload.length - 1];
      setScheduleData(scheduleItem);
      return true;
    } catch (error) {
      console.error("일정 확인 중 오류 발생:", error);
      setScheduleData(null);
      return false;
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const checkScheduleForDate = async () => {
        const hasSchedule = await checkScheduleExists(selectedDate);
        setIsScheduleAvailable(hasSchedule);
      };
      checkScheduleForDate();
    }
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
    }
  };

  useEffect(() => {
    showShareModal();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F4F8F3" }}
    >
      {selectedDate && (
        <>
          <Header
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedDayIndex={selectedDayIndex}
            setSelectedDayIndex={setSelectedDayIndex}
          />
          <WeatherInfo selectedDate={selectedDate} />
          {isScheduleAvailable ? (
            <NewSchedule
              selectedDate={selectedDate}
              scheduleData={scheduleData}
            />
          ) : (
            <Schedule />
          )}
        </>
      )}
    </ScrollView>
  );
}
