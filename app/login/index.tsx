import React, { useState, useLayoutEffect } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes.d'; 
import CameraIcon from '../../assets/images/camera.svg';
import BackIcon from '../../assets/images/go.svg';  

   export default function Nickname() {
     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
     const [nickname, setNickname] = useState('');

  // 헤더 숨기기
     useLayoutEffect(() => {
       navigation.setOptions({ headerShown: false });
       }, [navigation]);

       const handleStart = () => {
           if (!nickname.trim()) {
           Alert.alert('닉네임 오류', '닉네임을 입력해주세요.');
          return;
    }
          navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <BackIcon width={24} height={24} />
         </TouchableOpacity>

      <Text style={styles.title}>
          루키에서 사용 할{'\n'}닉네임을 적어주세요!
      </Text>

      <TouchableOpacity style={styles.photoContainer}>
         <CameraIcon style={styles.cameraIcon} />
      </TouchableOpacity>

      <Text style={styles.photoText}>사진 선택해주세요.</Text>

      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력해주세요"
        placeholderTextColor="#999999"
        value={nickname}
        onChangeText={setNickname}
      />

      <TouchableOpacity
        style={[styles.startButton, !nickname.trim() && styles.disabledButton]}
        onPress={handleStart}
        disabled={!nickname.trim()}
      >
        <Text
    style={[
      styles.startButtonText,
      !nickname.trim() && styles.disabledButtonText,
    ]}
  >Lookie 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 50,
    marginTop: 60,
  },
  backButtonText: {
    fontSize: 18,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 37,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',

  },
  cameraIcon: {
    width: 40,
    height: 40,
  },
  photoText: {
    fontSize: 13,
    color: '#666666',
    marginTop: 16,
    marginBottom: 38,
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 2,
    borderColor: '#121212',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 291,
    backgroundColor: '#FFF',
  },
  startButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#121212',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#C6FF6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  disabledButtonText: {
    color: '#FFF',
  },
});