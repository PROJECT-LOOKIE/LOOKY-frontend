import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Logo from "../assets/images/logo.svg";
import KakaoIcon from "../assets/images/kakao.svg";
import AppleIcon from "../assets/images/apple.svg";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const webViewRef = useRef<WebView>(null);

  // 백엔드 리디렉트 URL
  const redirectUrl = "http://43.201.12.36:3000/token";

  // 카카오 인증 URL
  const kakaoAuthUrl = "http://43.201.12.36:8080/oauth2/authorization/kakao";

  // WebView URL 변경 시 호출
  const handleNavigationStateChange = async(event: any) => {
    const url = event.url;
    console.log("현재 URL:", url);

    // 리디렉트 URL 확인 및 토큰 추출
    if (url.startsWith(redirectUrl)) {
      const accessTokenMatch = url.match(/accessToken=([^&]+)/);
      const refreshTokenMatch = url.match(/refreshToken=([^&]+)/);

      if (accessTokenMatch && refreshTokenMatch) {
        const accessToken = decodeURIComponent(accessTokenMatch[1]);
        const refreshToken = decodeURIComponent(refreshTokenMatch[1]);

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        await SecureStore.setItemAsync("accessToken", accessToken);
        await SecureStore.setItemAsync("refreshToken", refreshToken);

        setShowWebView(false);
        sendUserDataToServer(accessToken); // 서버로 요청
      } else {
        console.error("토큰이 URL에 없습니다.");
        Alert.alert("로그인 실패", "토큰을 받아올 수 없습니다.");
      }
    }
  };

  const sendUserDataToServer = async (accessToken: string) => {
    setLoading(true); 
    try {
      const response = await fetch("http://43.201.12.36:8080/api/v1/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, 
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("서버 응답:", data);
        Alert.alert("로그인 성공", "로그인에 성공했습니다.");
        router.push("/login"); 
      } else {
        console.error("서버 에러:", data);
        Alert.alert("로그인 실패", "서버와의 통신에 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("API 요청 에러:", error);
      Alert.alert("로그인 실패", "서버 요청 중 문제가 발생했습니다.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      {!showWebView && (
        <View style={styles.logo}>
          <Logo width={409} height={112} />
        </View>
      )}

      {/* 카카오 로그인 버튼 */}
      {!showWebView && (
        <TouchableOpacity style={styles.kakaoButton} onPress={() => setShowWebView(true)}>
          <KakaoIcon width={345} height={50} />
        </TouchableOpacity>
      )}

      {/* 애플 로그인 버튼 */}
      {!showWebView && (
        <TouchableOpacity style={styles.appleButton} onPress={() => router.push("/login")}>
          <AppleIcon width={345} height={50} />
        </TouchableOpacity>
      )}

      {/* 로딩 인디케이터 */}
      {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#FFFFFF" />}

      {/* WebView */}
      {showWebView && (
        <View style={styles.webviewContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: kakaoAuthUrl }}
            onNavigationStateChange={handleNavigationStateChange}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            startInLoadingState={true}
            onError={(event) => {
              console.error("WebView 에러:", event.nativeEvent);
              Alert.alert("WebView 에러", "페이지를 불러오지 못했습니다.");
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 200,
    alignItems: "center",
  },
  kakaoButton: {
    marginTop: 215,
    alignItems: "center",
  },
  appleButton: {
    alignItems: "center",
    marginTop: 30,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  webviewContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  webview: {
    flex: 1,
  },
});
