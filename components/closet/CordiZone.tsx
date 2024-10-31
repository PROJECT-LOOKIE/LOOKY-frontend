import { View, Image } from "react-native";
import { StyleSheet } from "react-native";

export default function CordiZone() {
  const cordinationBg = require("../../assets/images/cordinationBg.png");

  return (
    <View style={styles.container}>
      <Image source={cordinationBg} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%", // 가로 길이를 100%로 설정
    aspectRatio: 1, // 원하는 비율 (예: 1.5 = 3:2, 1 = 정사각형 등)
  },
  image: {
    width: "100%", // 가로 길이에 맞춤
    height: "100%", // 세로 길이는 자동으로 비율에 맞춤
  },
});
