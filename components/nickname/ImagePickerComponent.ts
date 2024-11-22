import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const requestPhotoLibraryPermission = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert("권한 오류", "사진 라이브러리 접근 권한이 필요합니다.");
    return false;
  }
  return true;
};

export const selectImage = async () => {
  const hasPermission = await requestPhotoLibraryPermission();
  if (!hasPermission) return null;

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!pickerResult.canceled) {
    return pickerResult.assets[0].uri;
  }
  return null;
};

export const getBlob = (uri: string) => {
  return new Promise<Blob>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("Blob 생성 실패"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

export const uploadImageToS3 = async (
  presignedUrl: string,
  imageUri: string
) => {
  try {
    const blob = await getBlob(imageUri);

    const uploadResponse = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": blob.type,
      },
      body: blob,
    });

    if (!uploadResponse.ok) {
      console.error("이미지 업로드 실패:", uploadResponse);
      throw new Error("이미지 업로드 실패");
    }

    console.log("이미지 업로드 성공");
  } catch (error) {
    console.error("이미지 업로드 에러:", error);
    throw error;
  }
};