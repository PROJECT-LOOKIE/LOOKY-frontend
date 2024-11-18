import React, { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import CameraIcon from "../../assets/images/camera.svg";
import BackIcon from "../../assets/images/go.svg";

export const unstable_settings = {
  initialRouteName: "nickname", 
};

export default function Nickname() {
  const [nickname, setNickname] = useState("");
  const [isError, setIsError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 닉네임 유효성 검증
  const validateNickname = (text: string) => {
    const startsWithNumber = /^[0-9]/.test(text);
    const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);
    const isInvalidLength = text.length < 4 || text.length > 16;

    if (!text.trim() || startsWithNumber || containsSpecialChar || isInvalidLength) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  // 사진 선택
  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("권한 오류", "사진 라이브러리 접근 권한이 필요합니다.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  const handleStart = async () => {
    if (isError) {
      Alert.alert("닉네임 오류", "닉네임을 다시 확인해주세요.");
      return;
    }

    try {
      const response = await fetch("http://43.201.12.36:8080/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          filePath: selectedImage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("서버 응답:", data);
        Alert.alert("닉네임 설정 성공", "닉네임 설정에 성공했습니다.");
        router.push("/home");
      } else {
        console.error("서버 에러:", data);
        Alert.alert("닉네임 설정 실패", "서버와의 통신에 문제가 발생했습니다.");
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
        루키에서 사용 할{'\n'}닉네임을 적어주세요!
      </Text>

      <TouchableOpacity style={styles.photoContainer} onPress={handleSelectImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.photo} />
        ) : (
          <CameraIcon style={styles.cameraIcon} />
        )}
      </TouchableOpacity>
      <Text style={styles.photoText}>사진 선택해주세요.</Text>

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