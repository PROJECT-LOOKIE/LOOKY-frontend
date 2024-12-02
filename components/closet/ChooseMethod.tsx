import { useState } from "react";
import { View, Text } from "../Themed";
import { Alert, StyleSheet } from "react-native";
import { StyleProp, ViewStyle } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { postPresignedURL, requestRembg } from "@/api/updateImage";
import { router } from "expo-router";
import { saveDataSecurely } from "@/utils/schedule/stroageUtills";
import { uploadImageToS3 } from "../nickname/ImagePickerComponent";

interface ChooseMethodProps {
  modalStyle: StyleProp<ViewStyle>;
}

export default function ChooseMethod({ modalStyle }: ChooseMethodProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [captureImage, setCapturedImage] = useState<string | null>(null);
  const prefix = "/images/profile";

  const openGallery = async () => {
    // 권한 요청
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("권한이 필요합니다!");
      return;
    }

    // 이미지 선택 -> 가끔씩 이미지 선택 실패
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지만 선택 가능
      allowsEditing: true, // 편집 허용
      aspect: [4, 3], // 비율
      quality: 1, // 이미지 품질 (0~1)
    });

    // console.log(result);

    // if (!result.canceled && result) {
    //   setSelectedImage(result.assets[0].uri); // 선택한 이미지의 URI를 상태에 저장
    // }

    // // 이미지 uri 를 백에게 전달 -> 누끼 제거 후 다시 받아오기 (api 정의 되고나서 구현 시작)
    // console.log(selectedImage);

    // saveDataSecurely("imageUrl", selectedImage);
    // // 일단 누끼제거 됐다 치고,,
    // router.push({ pathname: "/upload", params: { selectedImage } });

    if (result.assets) {
      setSelectedImage(result.assets[0].uri);

      try {
        let filePathOnServer = null;

        if (selectedImage) {
          const fileName = `${Date.now()}_${selectedImage.split("/").pop()}`;
          const presignedData = await postPresignedURL({
            prefix,
            fileName,
          });

          if (presignedData.result.code !== 200) {
            Alert.alert(
              "오류",
              presignedData.result.message ||
                "파일 업로드 URL 생성에 실패했습니다."
            );
            return;
          }

          const presignedUrl = presignedData.payload.url;
          filePathOnServer = presignedData.payload.filePath;

          // console.log(presignedUrl);
          // console.log(filePathOnServer);

          if (!presignedUrl) {
            Alert.alert("오류", "Presigned URL이 생성되지 않았습니다.");
            return;
          }

          await uploadImageToS3(presignedUrl, selectedImage);

          if (filePathOnServer) {
            await saveDataSecurely("uploadclothImage", filePathOnServer);
            await saveDataSecurely("displayImage", result.assets[0].uri);
          }

          router.push("/upload");
        } else {
          Alert.alert("다시 시도해주세요.");
        }
      } catch (error) {
        console.error("API 요청 에러:", error);
        Alert.alert("옷 정보 등록 실패", "서버 요청 중 문제가 발생했습니다.");
      }

      // try {
      //   const rembgImage = await requestRembg(result);
      //   console.log(rembgImage);
      //   // .then((blob) => {
      //   //   const objectURL = URL.createObjectURL(blob); // Blob URL 생성
      //   // })
      //   // .catch((error) => {
      //   //   console.error(
      //   //     "There has been a problem with your fetch operation:",
      //   //     error
      //   //   );
      //   // });
      // } catch (err) {
      //   console.error("배경 제거 실패", err);
      // }
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

    // 이미지 uri 를 백에게 전달 -> 누끼 제거 후 다시 받아오기 (api 정의 되고나서 구현 시작)
    console.log(`카메라로 촬영한 이미지 url : ${captureImage}`);
  };

  return (
    <View style={modalStyle}>
      <Text style={{ color: "white", fontSize: 16 }} onPress={openGallery}>
        앨범에서 추가
      </Text>

      <View style={styles.separator} />

      <Text style={{ color: "white", fontSize: 16 }} onPress={openCamera}>
        사진 촬영하기
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "white",
    marginVertical: 10,
    width: "100%",
  },
});
