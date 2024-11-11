import { useState } from "react";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import { StyleProp, ViewStyle } from "react-native";

import * as ImagePicker from "expo-image-picker";

interface ChooseMethodProps {
  modalStyle: StyleProp<ViewStyle>;
}

export default function ChooseMethod({ modalStyle }: ChooseMethodProps) {
  const [selectedImage, setSelectedImage] = useState<String | null>(null);
  const [captureImage, setCapturedImage] = useState<String | null>(null);

  const openGallery = async () => {
    // 권한 요청
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("권한이 필요합니다!");
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지만 선택 가능
      allowsEditing: true, // 편집 허용
      aspect: [4, 3], // 비율
      quality: 1, // 이미지 품질 (0~1)
    });

    if (!result.canceled && result) {
      setSelectedImage(result.assets[0].uri); // 선택한 이미지의 URI를 상태에 저장

      // 이미지 uri 를 백에게 전달 -> 누끼 제거 후 다시 받아오기 (api 정의 되고나서 구현 시작)
    }
  };

  const openCamera = async () => {
    // 권한 요청
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("카메라 접근 권한이 필요합니다!");
      return;
    }

    // 카메라로 이미지 찍기
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    // 결과 객체 출력 (디버깅)
    console.log(result);

    if (!result.canceled) {
      // 선택한 이미지의 URI를 상태에 저장
      const imageUri = result.assets[0]?.uri;
      if (imageUri) {
        setCapturedImage(imageUri);
      }
    }
  };

  return (
    <View style={modalStyle}>
      <Text style={{ color: "white", fontSize: 16 }} onPress={openGallery}>
        앨범에서 추가
      </Text>

      {/* 구분선 추가 */}
      <View style={styles.separator} />

      <Text style={{ color: "white", fontSize: 16 }} onPress={openCamera}>
        사진 촬영하기
      </Text>
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
