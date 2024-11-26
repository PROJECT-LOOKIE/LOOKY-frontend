import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const getToken = async () => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    return token;
  } else {
    Alert.alert("토근 정보가 유효하지 않습니다.");
  }
};
