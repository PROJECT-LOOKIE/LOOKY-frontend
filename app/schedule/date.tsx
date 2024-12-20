import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Header from "../../components/schedule/Header";
import ProgressBar from "../../components/schedule/Progressbar";
import NextButton from "../../components/schedule/NextButton";
import { router } from "expo-router";
import { saveDataSecurely } from "@/utils/schedule/stroageUtills";

export default function Date() {
    const [schedulDate, setScheduleDate] = useState("");

    const saveLocation = async () => {
        if (!schedulDate.trim()) {
          Alert.alert("오류", "일정을 입력하세요.");
          return;
        }
    
        try {
          await saveDataSecurely("location", schedulDate); 
          console.log("Location 저장 완료:", schedulDate);
          router.push("./place"); 
        } catch (error) {
          console.error("Location 저장 실패:", error);
          Alert.alert("오류", "위치를 저장하는 중 문제가 발생했습니다.");
        }
      };

    return (
        <View style={styles.container}>
        <Header stepText="2/3" />
        <ProgressBar activeStep={2} />
    
        <View style={styles.titleContainer}>
            <Text style={styles.title}>어디서 만나는{'\n'}일정 인가요?</Text>
        </View>

        <TextInput
        style={styles.input}
        placeholder="일정을 입력하세요"
        value={schedulDate}
        onChangeText={setScheduleDate}
      />
    
    <NextButton text="다음" onPress={saveLocation} />
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
    input: {
        height: 52,
        borderColor: "#121212",
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 18,
        color: "#121212",
        marginBottom: 470,
        paddingLeft: 16,
      },
});