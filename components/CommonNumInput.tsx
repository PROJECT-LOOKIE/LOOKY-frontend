import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

type CommonNumInputProps = {
  placeholder: string;
  style?: object; // 스타일을 선택적으로 받을 수 있도록
  onChangeNumber: (num: number) => void; // 숫자 입력 이벤트 처리 함수
  value?: string;
};

const CommonNumInput = ({
  placeholder,
  style,
  onChangeNumber,
  value,
}: CommonNumInputProps) => {
  const handleChangeText = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
    const number = parseInt(filteredText, 10); // 숫자로 변환
    if (!isNaN(number)) {
      onChangeNumber(number); // 유효한 숫자일 경우에만 호출
    } else {
      onChangeNumber(0); // 빈 입력일 경우 기본값 0
    }
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        keyboardType="numeric" // 숫자 키패드 표시
        onChangeText={handleChangeText} // 숫자 필터링 및 전달
        defaultValue={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
  },
  input: {
    height: 52,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default CommonNumInput;
