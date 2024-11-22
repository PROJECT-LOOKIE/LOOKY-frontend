import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Header from "../../components/schedule/Header";
import ProgressBar from "../../components/schedule/Progressbar";
import NextButton from "../../components/schedule/NextButton";
import CustomSlider from "../../components/schedule/CustomSlider";
import CategorySelector from "../../components/schedule/CategorySelector";
import LevelDescription from "../../components/schedule/LevelDescription";
import { router } from "expo-router";
import { saveDataSecurely, getDataSecurely, deleteDataSecurely } from "../../utils/schedule/stroageUtills"

export default function Place() {
  const [selectedCategory, setSelectedCategory] = useState("데이트");
  const [level, setLevel] = useState(3);

  const categories = ["데이트", "모임", "행사", "비즈니스", "운동"];
  const levelDescriptions = {
    1: "오늘은 편안함이 최고! \n집에서 편하게 입을 수 있는 옷차림으로 느긋하게 보내자~",
    2: "꾸미기엔 조금 귀찮은 날,\n 깔끔하고 자연스러운 스타일로! 심플한 차림으로 편안하게!",
    3: "꾸민 듯 안 꾸민 듯 자연스러운 멋,\n캐주얼하면서도 신경 쓴 듯한 스타일로 완성!",
    4: "옷장에서 가장 멋진 옷을 골라서 스타일에 신경 써보자. 특별한 날처럼 조금 더 준비된 모습으로!",
    5: "머리부터 발끝까지 완벽한 스타일링! \n오늘의 주인공은 바로 나!",
  };

  const handleSaveData = async () => {
    try {
      // 'atmosphere'와 'decoration' 저장
      await saveDataSecurely("atmosphere", selectedCategory);
      await saveDataSecurely("decoration", String(level));
      console.log("Atmosphere:", selectedCategory, "Decoration:", level);

      // 다른 데이터 불러오기
      const name = await getDataSecurely("name");
      const date = await getDataSecurely("date");
      const location = await getDataSecurely("location");
      const accessToken = await getDataSecurely("accessToken");

      if (!accessToken) {
        Alert.alert("오류", "엑세스 토큰이 없습니다.");
        return;
      }

      // 날짜 형식 변환 (YYYY-MM-DD)
      const formattedDate = date ? date.substring(0, 10) : null;

      // 서버로 보낼 데이터 구성
      const scheduleData = {
        name,
        date: formattedDate,
        location,
        atmosphere: selectedCategory,
        decoration: level,
      };

      console.log("보낼 스케줄 데이터:", scheduleData);

      // API 호출
      const response = await fetch("https://lookie.store/api/v1/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(scheduleData),
      });

      const responseBody = await response.json();
      console.log("서버 응답:", responseBody);

      if (response.ok) {
        Alert.alert("성공", "일정이 생성되었습니다!");
        // 데이터 삭제
        await deleteDataSecurely("name");
        await deleteDataSecurely("date");
        await deleteDataSecurely("location");
        await deleteDataSecurely("atmosphere");
        await deleteDataSecurely("decoration");
        router.push("/home"); 
        
      } else if (response.status === 401) {
        Alert.alert("오류", "인증이 만료되었습니다. 다시 로그인해주세요.");
        router.push("/login");
      } else {
        Alert.alert("오류", `일정 생성에 실패했습니다: ${responseBody.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("API 요청 에러:", error);
      Alert.alert("오류", "서버와 통신하는 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Header stepText="3/3" />
      <ProgressBar activeStep={3} />

      <Text style={styles.title}>어떤 분위기의{"\n"}자리인가요?</Text>

      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <View style={styles.decorationContainer}>
        <Text style={styles.subtitle}>꾸밈정도를{"\n"}선택해주세요</Text>
        <CustomSlider value={level} onValueChange={setLevel} />
        <View style={styles.levelLabelContainer}>
          {[...Array(5)].map((_, index) => (
            <Text
              key={index}
              style={[
                styles.levelLabel,
                level === index + 1 && styles.activeLevelLabel,
              ]}
            >
              Lv. {index + 1}{" "}
              {index + 1 === 1
                ? "\n거지"
                : index + 1 === 2
                ? "\n안꾸"
                : index + 1 === 3
                ? "\n꾸안꾸"
                : index + 1 === 4
                ? "\n꾸꾸"
                : "\n꾸꾸꾸"}
            </Text>
          ))}
        </View>
      </View>

      <LevelDescription level={level} descriptions={levelDescriptions} />

      <NextButton
        text="생성하기!"
        onPress={handleSaveData} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FFF4",
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 32,
  },
  decorationContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
    alignSelf: "flex-start",
    marginBottom: 50,
  },
  levelLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  levelLabel: {
    fontSize: 18,
    color: "#B3B3B3",
    textAlign: "center",
    fontWeight: "bold",
  },
  activeLevelLabel: {
    fontWeight: "bold",
    color: "#121212",
  },
});