import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { router } from "expo-router";
import CameraIcon from "../../assets/images/camera.svg";
import BackIcon from "../../assets/images/go.svg";
import * as SecureStore from "expo-secure-store";
import { selectImage, uploadImageToS3 } from "../../components/nickname/ImagePickerComponent"; // 유틸 함수 가져오기

export default function Nickname() {
  const [nickname, setNickname] = useState("");
  const [isError, setIsError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        if (token) {
          setAccessToken(token);
        } else {
          Alert.alert("오류", "액세스 토큰을 가져올 수 없습니다.");
        }
      } catch (error) {
        console.error("토큰 가져오기 에러:", error);
        Alert.alert("오류", "토큰을 가져오는 중 에러가 발생했습니다.");
      }
    };
    getToken();
  }, []);

  const validateNickname = (text: string) => {
    const startsWithNumber = /^[0-9]/.test(text);
    const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);
    const isInvalidLength = text.length < 4 || text.length > 16;

    setIsError(
      !text.trim() || startsWithNumber || containsSpecialChar || isInvalidLength
    );
  };

  const handleSelectImage = async () => {
    const imageUri = await selectImage(); 
    if (imageUri) {
      setSelectedImage(imageUri);
    }
  };

  const handleStart = async () => {
    if (isError) {
      Alert.alert("닉네임 오류", "닉네임을 다시 확인해주세요.");
      return;
    }

    if (!accessToken) {
      Alert.alert("오류", "액세스 토큰이 없습니다.");
      return;
    }

    try {
      let filePathOnServer = null;

      if (selectedImage) {
        const presignedResponse = await fetch(
          "https://lookie.store/api/v1/file",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              prefix: "/images/profile",
              fileName: `${Date.now()}_${selectedImage.split("/").pop()}`,
            }),
          }
        );

        const presignedData = await presignedResponse.json();

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

        if (!presignedUrl) {
          Alert.alert("오류", "Presigned URL이 생성되지 않았습니다.");
          return;
        }

        await uploadImageToS3(presignedUrl, selectedImage); 
      }

      const response = await fetch("https://lookie.store/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          nickname,
          filePath: filePathOnServer,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("닉네임 설정 성공", "닉네임 설정에 성공했습니다.");
        router.push("/home");
      } else {
        Alert.alert(
          "닉네임 설정 실패",
          data.message || "서버와의 통신에 문제가 발생했습니다."
        );
      }
    } catch (error) {
      console.error("API 요청 에러:", error);
      Alert.alert("닉네임 설정 실패", "서버 요청 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <BackIcon width={24} height={24} />
      </TouchableOpacity>

      <Text style={styles.title}>
        루키에서 사용 할{"\n"}닉네임을 적어주세요!
      </Text>

      <TouchableOpacity
        style={styles.photoContainer}
        onPress={handleSelectImage}
      >
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.photo} />
        ) : (
          <CameraIcon style={styles.cameraIcon} />
        )}
      </TouchableOpacity>
      <Text style={styles.photoText}>사진을 선택해주세요.</Text>

      <TextInput
        style={[styles.input, isError && styles.inputError]}
        placeholder="숫자, 특수문자 없이 4~16자로 입력해주세요."
        placeholderTextColor="#999999"
        value={nickname}
        onChangeText={(text) => {
          setNickname(text);
          validateNickname(text);
        }}
      />

      <TouchableOpacity
        style={[
          styles.startButton,
          (!nickname.trim() || isError) && styles.disabledButton,
        ]}
        onPress={handleStart}
        disabled={!nickname.trim() || isError}
      >
        <Text
          style={[
            styles.startButtonText,
            (!nickname.trim() || isError) && styles.disabledButtonText,
          ]}
        >
          Lookie 시작하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 50,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 37,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 16,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  cameraIcon: {
    width: 40,
    height: 40,
  },
  photoText: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 38,
  },
  input: {
    width: "100%",
    height: 52,
    borderWidth: 2,
    borderColor: "#121212",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 291,
    backgroundColor: "#FFF",
  },
  inputError: {
    borderColor: "#FF0000",
  },
  startButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#121212",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    color: "#C6FF6B",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
  disabledButtonText: {
    color: "#FFF",
  },
});
