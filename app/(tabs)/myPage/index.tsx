import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text } from "@/components/Themed";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export default function TabFourScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const imagePath = await SecureStore.getItemAsync('userProfileImage');
        if (imagePath) {
          // S3 이미지 URL 생성 (예시 URL, 실제 S3 도메인으로 수정 필요)
          const imageUrl = `https://your-s3-bucket.amazonaws.com${imagePath}`;
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error('프로필 이미지 로드 실패:', error);
      }
    };

    loadProfileImage();
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
                profileImage
                  ? { uri: profileImage }
                  : require('../../../assets/images/default-profile.png')
              }
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>김강민</Text>
            <View style={styles.profileEmailWrapper}>
              <Image
                style={styles.profileEmailIcon}
                source={require('../../../assets/images/icon_kakao.png')}
              />
              <Text style={styles.profileEmail}>rkdals0203@naver.com</Text>
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
    backgroundColor: '#F4F8F3',
    padding: 20,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F4F8F3',
  },
  profileSection: {
    backgroundColor: '#F4F8F3', // 배경색 (연한 초록색)
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0', // 프로필 배경색
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    resizeMode: 'cover',
  },
  profileInfo: {
    marginLeft: 15,
    backgroundColor: '#F4F8F3', // 배경색 (연한 초록색)
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121212',
  },
  profileEmailWrapper: {
    backgroundColor: '#F4F8F3', // 배경색 (연한 초록색)
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  profileEmailIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
  },
  noticeText: {
    textAlign: 'left',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  buttonSection: {
    marginBottom: 20,
    backgroundColor: '#F4F8F3', // 배경색 (연한 초록색)
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  termsSection: {
    flexDirection: 'row',
    backgroundColor: '#F4F8F3', // 배경색 (연한 초록색)
    justifyContent: 'center',
    marginTop: 20,  // 로그아웃 버튼과의 간격
  },
  termsText: {
    fontSize: 12,
    color: '#999',
  },
  termsDivider: {
    fontSize: 12,
    color: '#999',
    marginHorizontal: 8,
  },
  deleteAccount: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  deleteAccountText: {
    fontSize: 12,
    color: '#999',
  },
  combinedButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuItem: {
    padding: 15,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 15,
  },
});
