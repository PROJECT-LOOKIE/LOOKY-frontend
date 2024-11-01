import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import { StyleProp, ViewStyle } from "react-native";

interface ChooseMethodProps {
  modalStyle: StyleProp<ViewStyle>;
}

export default function ChooseMethod({ modalStyle }: ChooseMethodProps) {
  return (
    <View style={modalStyle}>
      <Text style={{ color: "white" }}>앨범에서 추가</Text>

      {/* 구분선 추가 */}
      <View style={styles.separator} />

      <Text style={{ color: "white" }}>사진 촬영하기</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1, // 구분선의 높이
    backgroundColor: "white", // 구분선의 색상
    marginVertical: 10, // 구분선과 텍스트 간의 간격
    width: "100%", // 구분선의 너비 (부모 View의 너비와 동일)
  },
});
