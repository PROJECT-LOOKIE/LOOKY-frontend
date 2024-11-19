import React from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

export default function CustomSlider({ value, onValueChange }: CustomSliderProps) {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#121212"
        maximumTrackTintColor="#121212"
        thumbTintColor="transparent"
      />
      <View
        style={[
          styles.customThumb,
          { left: `${((value - 1) / 4) * 100 - 4}%` }, // 핸들 위치 계산
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  customThumb: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#C6FF6B",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#121212",
    top: 8,
  },
});
