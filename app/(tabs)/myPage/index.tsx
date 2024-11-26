import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";
import { Text } from "@/components/Themed";
import * as SecureStore from "expo-secure-store";

export default function TabFourScreen() {
  const [userInfo, setUserInfo] = useState({
    nickname: "사용자",
    email: "이메일 없음",
    imageUrl: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        if (!token) {
          Alert.alert("오류", "엑세스 토큰이 없습니다.");
          return;
        }

        const requestUrl = "http://43.201.12.36:8080/api/v1/user/mypage";
        console.log("요청 URL:", requestUrl);

        const response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error(
            `사용자 정보 조회 실패: ${response.status} - ${response.statusText}`
          );
          setError("사용자 정보를 가져오지 못했습니다.");
          return;
        }

        const userData = await response.json();

        if (userData.result.code !== 200) {
          setError("사용자 정보 조회 중 오류가 발생했습니다.");
          return;
        }

        setUserInfo({
          nickname: userData.payload.nickname || "사용자",
          email: userData.payload.email || "이메일 없음",
          imageUrl: userData.payload.imageUrl, 
        });
      } catch (error) {
        console.error("API 호출 오류:", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <Image
              style={styles.profileImage}
              source={
                userInfo.imageUrl
                  ? { uri: userInfo.imageUrl }
                  : require("../../../assets/images/default-profile.png") 
              }
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userInfo.nickname}</Text>
            <View style={styles.profileEmailWrapper}>
              <Image
                style={styles.profileEmailIcon}
                source={require("../../../assets/images/icon_kakao.png")}
              />
              <Text style={styles.profileEmail}>{userInfo.email}</Text>
            </View>
          </View>
        </View>

        {/* 알림 텍스트 */}
        <Text style={styles.noticeText}>루키를 살려주세요</Text>

        {/* 버튼 섹션 */}
        <View style={styles.buttonSection}>
          <View style={styles.combinedButton}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.buttonText}>앱스토어에서 평가하기</Text>
            </TouchableOpacity>
            <View style={styles.horizontalDivider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.buttonText}>@Lookie 팔로우</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>로그아웃</Text>
          </TouchableOpacity>

          {/* 개인정보 처리방침과 이용약관 */}
          <View style={styles.termsSection}>
            <TouchableOpacity>
              <Text style={styles.termsText}>개인정보 처리방침</Text>
            </TouchableOpacity>
            <Text style={styles.termsDivider}> | </Text>
            <TouchableOpacity>
              <Text style={styles.termsText}>이용 약관</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 계정 삭제 - 화면 맨 아래에 고정 */}
      <TouchableOpacity style={styles.deleteAccount}>
        <Text style={styles.deleteAccountText}>계정삭제</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8F3",
    padding: 20,
    paddingTop: 60,
    justifyContent: "space-between",
  },
  mainContent: {
    flex: 1,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    resizeMode: "cover",
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#121212",
  },
  profileEmailWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  profileEmailIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
  },
  noticeText: {
    textAlign: "left",
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  buttonSection: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 4,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
  },
  termsSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  termsText: {
    fontSize: 12,
    color: "#999",
  },
  termsDivider: {
    fontSize: 12,
    color: "#999",
    marginHorizontal: 8,
  },
  deleteAccount: {
    alignItems: "center",
    paddingVertical: 20,
  },
  deleteAccountText: {
    fontSize: 12,
    color: "#999",
  },
  combinedButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuItem: {
    padding: 15,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 15,
  },
});
