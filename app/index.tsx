import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import Logo from "../assets/images/logo.svg";
import KakaoIcon from "../assets/images/kakao.svg";
import AppleIcon from "../assets/images/apple.svg";

export default function Login() {
  return (
    <View style={styles.container}>
      {/* 로고 */}
      <View style = {styles.logo}>
      <Logo width={409} height={112} />
      </View>

      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity style={styles.kakaoButton}>
          <KakaoIcon width={345} height={50} />
      </TouchableOpacity>

      {/* 애플 로그인 버튼 */}
      <TouchableOpacity style={styles.appleButton}
        onPress={() => {
          router.push("/home");
        }}>
        <AppleIcon width={345} height={50} />
      </TouchableOpacity>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    marginTop: 200,
  },

  kakaoButton: {
    marginTop: 215,
  },

  appleButton: {
    alignItems: "center",
    marginTop: 30,
  },
});