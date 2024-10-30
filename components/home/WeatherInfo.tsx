import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function WeatherInfo() {
  return (
    <View>
      {/* PNG 눈 이모티콘 */}
      <View style={styles.emojiContainer}>
        <Image
          source={require("../../assets/images/OO.png")} // 나중에 수정필요
          style={{ width: 40, height: 40 }}
        />
      </View>

      {/* 날씨 정보 박스 */}
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherText}>
          오늘은 <Text style={styles.boldText}>최고온도 20도</Text>,{" "}
          <Text style={styles.boldText}>최저 온도 2도</Text>에요.
        </Text>
        <Text style={styles.weatherText}>
          날씨는 맑지만 일교차가 심하니 겉옷을 추천해요.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emojiContainer: {
    marginTop: 16,
    marginLeft: 20,
  },
  weatherContainer: {
    backgroundColor: "#C6FF6B",
    borderColor: "#121212",
    borderWidth: 2,
    borderRadius: 8,
    padding: 18,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  weatherText: {
    fontSize: 16,
    color: "#121212",
  },
  boldText: {
    fontWeight: "bold",
  },
});
