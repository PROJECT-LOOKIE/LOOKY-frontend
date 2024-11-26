import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import Colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import ChooseMethod from "./ChooseMethod";

export default function AddButton() {
  const rotation = useRef(new Animated.Value(0)).current;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false); // 회전 상태를 저장하는 상태값 추가

  // 아이콘을 눌렀을 때
  const handlePress = () => {
    // 1. 버튼 45도 회전 또는 원래 위치로 되돌리기
    Animated.timing(rotation, {
      toValue: isRotated ? 0 : 1, // isRotated에 따라 0 또는 1로 설정
      duration: 200,
      useNativeDriver: true,
    }).start();

    setIsRotated(!isRotated); // 회전 상태를 반전시킴

    // 2. 카메라 | 갤러리 선택 팝업창 등장
    setIsModalOpen(!isModalOpen);
  };

  // rotation 값을 애니메이션으로 변환하여 0 -> 45도로 회전하게 합니다.
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <View style={styles.buttonPosition}>
      <Pressable onPress={handlePress} style={{ zIndex: 100 }}>
        <View style={styles.blackBg} />
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <AntDesign name="pluscircle" size={53} color={Colors.yellowGreen} />
        </Animated.View>
      </Pressable>
      {isModalOpen && <ChooseMethod modalStyle={styles.modalPosition} />}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPosition: {
    position: "absolute",
    bottom: 21,
  },
  blackBg: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "black",
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  modalPosition: {
    position: "absolute",
    bottom: 60,
    width: 139,
    height: 100,
    left: "50%",
    marginLeft: -139 / 2,
    borderRadius: 8,
    backgroundColor: Colors.gray700,
    opacity: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
