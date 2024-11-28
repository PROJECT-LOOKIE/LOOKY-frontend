import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import TagIcon from "../../assets/images/#.svg";
import PeopleIcon from "../../assets/images/people.svg";
import PlaceIcon from "../../assets/images/place.svg";
import ArrowIcon from "../../assets/images/arrow.svg";
import ThreeContainers from "./ThreeContainers";
import { getDataSecurely } from "../../utils/schedule/stroageUtills";

interface NewScheduleProps {
  selectedDate: Date;
  scheduleData: any;
}

export default function NewSchedule({ selectedDate }: NewScheduleProps) {
  const [scheduleData, setScheduleData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const token = await getDataSecurely("accessToken");
        if (!token) {
          Alert.alert("오류", "엑세스 토큰이 없습니다.");
          router.push("/login");
          return;
        }

        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1; 
        const day = selectedDate.getDate();

        const requestUrl = `http://43.201.12.36:8080/api/v1/schedule?year=${year}&month=${month}&day=${day}`;
        console.log("최종 요청 URL:", requestUrl);

        const response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error(
            `스케줄 목록 응답 오류: ${response.status} - ${response.statusText}`
          );
          setError("스케줄 목록을 가져오지 못했습니다.");
          return;
        }

        const scheduleList = await response.json();

        if (!scheduleList.payload || scheduleList.payload.length === 0) {
          setError("해당 날짜에 스케줄이 없습니다.");
          return;
        }

        const scheduleItem = scheduleList.payload[scheduleList.payload.length - 1];

        setScheduleData(scheduleItem);
      } catch (err) {
        console.error("API 호출 중 오류:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, [selectedDate]);

  return (
    <View style={styles.scheduleContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
        <Text style={styles.emoji}>
        {scheduleData?.emoji || "🏃‍♂️"}
        </Text>
          <Text style={styles.scheduleTitle}>{scheduleData?.name}</Text>
          <TouchableOpacity onPress={() => router.push("/home")}>
            <ArrowIcon width={16} height={16} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <TagIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.infoText}>{scheduleData?.atmosphere}</Text>
          </View>
          <View style={styles.infoItem}>
            <PlaceIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.infoText}>{scheduleData?.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <PeopleIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.infoText}>
              {scheduleData?.people || "참가자 정보"}
            </Text>
          </View>
        </View>
      </View>

      <ThreeContainers />
    </View>
  );
}

const styles = StyleSheet.create({
  scheduleContainer: {
    padding: 20,
    flex: 1,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 26,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
    marginRight: 10,
  },
  arrowIcon: {
    marginRight: 10,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 4,
  },
  icon: {
    marginRight: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#121212",
  },
});
