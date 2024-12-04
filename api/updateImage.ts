import { getBlob } from "@/components/nickname/ImagePickerComponent";
import { getToken } from "./getToken";
import { requestPresignedDTO } from "@/model/closet/requestPresignedURL";
import RNFS from "react-native-fs";
import * as ImagePicker from "expo-image-picker";
import { REACT_NATIVE_API, REACT_NATIVE_REMBG_API } from "@env";

// 누끼 제거 요청 API
export const requestRembg = async (file: ImagePicker.ImagePickerResult) => {
  if (!file.assets || file.assets.length === 0) {
    throw new Error("유효하지 않은 파일입니다.");
  }

  const selectedAsset = file.assets[0]; // 첫 번째 파일 참조

  const formData = new FormData();
  formData.append("file", {
    uri: selectedAsset.uri,
    name: selectedAsset.fileName,
    type: selectedAsset.mimeType,
  });

  const res = await fetch(`https://lookie.store/api/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`HTTP 에러: ${res.status}`);
  }

  return res.blob();
};

// 1. /api/vi/file에 POST 요청 -> url, filePath 가져오기
export const postPresignedURL = async ({
  prefix,
  fileName,
}: requestPresignedDTO) => {
  const accessToken = await getToken();

  const presignedResponse = await fetch(`https://lookie.store/api/v1/file`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      prefix: prefix,
      fileName: fileName,
    }),
  });

  return presignedResponse.json();
};

// 2. url -> uploadImageToS3 에 이미지 등록 (위에서 뽑아온 presignedURL, 선택한 이미지 주소)
// uploadImageToS3(presignedUrl, selectedImage);

// 3. filePath -> 이미지 업로드 하는 api에 담아서 보내기 (closet api에 정의)
