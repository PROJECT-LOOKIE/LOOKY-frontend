import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import EmojiKeyboard from "rn-emoji-keyboard";
import Header from "../../components/schedule/Header";
import ProgressBar from "../../components/schedule/Progressbar";
import NextButton from "../../components/schedule/NextButton";
import { router } from "expo-router";
import { Alert } from "react-native";
import {saveDataSecurely} from "../../utils/schedule/stroageUtills";

export default function ScheduleName() {
  const [emoji, setEmoji] = useState("🤔");
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleName, setScheduleName] = useState("");

    // 일정 이름 저장 함수
    const saveScheduleName = async () => {
      if (!scheduleName.trim()) {
        Alert.alert("오류", "일정 이름을 입력해주세요.");
        return;
      }
      try {
        await saveDataSecurely("name", scheduleName); 
        console.log("일정 이름 저장 완료:", scheduleName);
        router.push("./date"); 
      } catch (error) {
        console.error("일정 이름 저장 실패:", error);
        Alert.alert("오류", "일정 이름을 저장하는 중 문제가 발생했습니다.");
      }
    };

  return (
    <View style={styles.container}>
      <Header stepText="1/3" />
      <ProgressBar activeStep={1} />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>어떤 일정인가요? {"\n"}일정의 이름을 적어주세요</Text>
      </View>

      <TouchableOpacity
        style={styles.emojiButtonContainer}
        onPress={() => setIsOpen(true)}
      >
        <View style={styles.emojiWrapper}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <Text style={styles.emojiText}>일정에 맞는 이모지를 선택해주세요!</Text>
      </TouchableOpacity>

      <EmojiKeyboard
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onEmojiSelected={(e) => {
          setEmoji(e.emoji);
          setIsOpen(false);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="일정을 입력하세요"
        value={scheduleName}
        onChangeText={setScheduleName}
      />

      <NextButton text="다음" onPress={saveScheduleName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FFF4",
    padding: 20,
  },
  titleContainer: {
    marginBottom: 37,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
  },
  emojiButtonContainer: {
    alignItems: "center",
    marginBottom: 38,
  },
  emojiWrapper: {
    backgroundColor: "#C6FF6B",
    borderRadius: 50,
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: "#121212",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 63,
  },
  emojiText: {
    marginTop: 16,
    fontSize: 14,
    color: "#666666",
  },
  input: {
    height: 52,
    borderColor: "#121212",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 18,
    color: "#121212",
    marginBottom: 290,
    paddingLeft: 16,
  },
});
