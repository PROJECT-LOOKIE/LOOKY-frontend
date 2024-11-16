import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { router } from "expo-router";
import Logo from "../assets/images/logo.svg";
import KakaoIcon from "../assets/images/kakao.svg";
import AppleIcon from "../assets/images/apple.svg";

export default function Login() {
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [showWebView, setShowWebView] = useState(false); // WebView 표시 여부
  const webViewRef = useRef<WebView>(null); // WebView 참조

  const kakaoClientId = "413f57cff0f9594cd4181cc039215b48"; // REST API 키
  const redirectUri = "https://8520-115-161-17-26.ngrok-free.app"; // Redirect URI

  // 카카오 인증 URL 생성
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code`;
  console.log("카카오 인증 URL:", kakaoAuthUrl);

  // WebView URL 변경 시 호출
  const handleNavigationStateChange = async (event: any) => {
    const url = event.url;
    console.log("현재 URL:", url);

    // 리다이렉트 URI에 도달했는지 확인
    if (url.startsWith(redirectUri)) {
      const codeMatch = url.match(/code=([^&]+)/); 
      if (codeMatch) {
        const code = codeMatch[1];
        setShowWebView(false);
        setLoading(true); 
        console.log("인증 코드:", code);

        try {
          // 액세스 토큰 요청
          const tokenResponse = await fetch("http://43.201.12.36:8080/oauth2/authorization/kakao", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            body: `grant_type=authorization_code&client_id=${kakaoClientId}&redirect_uri=${encodeURIComponent(
              redirectUri
            )}&code=${code}`,
          });

          const tokenData = await tokenResponse.json();
          console.log("토큰 데이터:", tokenData);

          if (!tokenData.access_token) {
            console.error("액세스 토큰 요청 실패:", tokenData);
            Alert.alert("로그인 실패", "토큰을 받아오지 못했습니다.");
            return;
          }

          const accessToken = tokenData.access_token;

          // 사용자 정보 요청
          const profileResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const profileData = await profileResponse.json();
          console.log("사용자 정보:", profileData);

          // 로그인 성공 알림
          Alert.alert("로그인 성공", `안녕하세요, ${profileData.properties.nickname}님!`);
          router.push("/home"); 
        } catch (error) {
          console.error("로그인 실패:", error);
          Alert.alert("로그인 실패", "다시 시도해주세요.");
        } finally {
          setLoading(false); 
        }
      } else {
        console.error("리다이렉트 URL에서 인증 코드를 찾을 수 없습니다.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <View style={styles.logo}>
        <Logo width={409} height={112} />
      </View>

      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity style={styles.kakaoButton} onPress={() => setShowWebView(true)}>
        <KakaoIcon width={345} height={50} />
      </TouchableOpacity>

      {/* 애플 로그인 버튼 */}
      <TouchableOpacity style={styles.appleButton} onPress={() => router.push("/home")}>
        <AppleIcon width={345} height={50} />
      </TouchableOpacity>

      {/* 로딩 인디케이터 */}
      {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#FFFFFF" />}

      {/* WebView */}
      {showWebView && (
        <WebView
          ref={webViewRef}
          source={{ uri: kakaoAuthUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          thirdPartyCookiesEnabled={true}
          userAgent="Mozilla/5.0 (Linux; Android 10; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0"
          startInLoadingState={true}
          onError={(event) => {
            console.error("WebView 에러:", event.nativeEvent);
            Alert.alert("WebView 에러", "페이지를 불러오지 못했습니다.");
          }}
        />
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
  },
  kakaoButton: {
    marginTop: 215,
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
  webview: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});