import Colors from "@/constants/Colors";
import { View, StyleSheet, Text, Button } from "react-native";
import { BoldText } from "../StyledText";
import AnimatedModal from "../ConfirmModal";
import { useState } from "react";

export default function Banner() {
  const grpInfoTemp = {
    id: 1,
    emoji: "happy",
    name: "한강공원 러닝",
    location: "반포 한강공원",
    atmosphere: "꾸꾸꾸꾸",
    userName: "임지은",
    people: 12,
  };
  const onConfirm = () => {
    console.log("수락");
    toggleModal();
  };
  const onCancel = () => {
    console.log("거절");
    toggleModal();
  };
  const [isVisible, setIsVisible] = useState(false); // 모달의 상태

  const toggleModal = () => setIsVisible(!isVisible);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <BoldText style={styles.text}>한강공원 런닝</BoldText>
        <Text style={styles.text}>Lv.3 꾸꾸꾸</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.Bottomtext}># 운동</Text>
        <Text style={styles.Bottomtext}># 반포 한강공원</Text>
        <Text style={styles.Bottomtext}># 박진홍 외 12명</Text>
      </View>
      {/* <Button title="모달 열기" onPress={toggleModal} /> */}

      {/* <AnimatedModal
        isShown={isVisible}
        title="정말 이 약속을 삭제하시겠어요?"
        confirmText="삭제하기"
        cancelText="취소하기"
        onConfirm={onConfirm}
        onCancel={onCancel}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: 108, // 총 높이 200 지정
  },
  top: {
    flex: 1, // 위쪽 영역의 높이를 50%로 설정
    backgroundColor: Colors.yellowGreen,
    width: "100%",
    alignItems: "center", // 텍스트 중앙 정렬
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  bottom: {
    flex: 1, // 아래쪽 영역의 높이를 50%로 설정
    backgroundColor: "black",
    width: "100%",
    alignItems: "center", // 텍스트 중앙 정렬
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24, // 폰트 사이즈 설정
  },
  Bottomtext: {
    color: Colors.yellowGreen,
    fontWeight: "bold",
    fontSize: 14, // 폰트 사이즈 설정
  },
});
