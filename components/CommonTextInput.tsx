import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

type CommonTextInputProps = {
  placeholder: string;
  style?: object; // 스타일을 선택적으로 받을 수 있도록
  onChangeText: (text: string) => void; // 텍스트 입력 이벤트 처리 함수
};

const CommonTextInput = ({
  placeholder,
  style,
  onChangeText,
}: CommonTextInputProps) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChangeText} // 텍스트 입력시 호출되는 함수
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

export default CommonTextInput;
