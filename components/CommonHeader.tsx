import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 사용을 위해 expo-vector-icons 라이브러리 사용
import Colors from "@/constants/Colors";

type CommonHeaderProps = {
  onLeftPress: () => void;
  onRightPress: () => void;
  text?: string;
  path?: string;
  style?: ViewStyle;
  isHide?: boolean;
};

const CommonHeader = ({
  onLeftPress,
  onRightPress,
  text,
  path,
  style,
  isHide,
}: CommonHeaderProps) => {
  return (
    <View style={[styles.headerContainer, style]}>
      {/* 왼쪽 아이콘 */}
      <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={path == "closet" ? "white" : "black"}
        />
      </TouchableOpacity>
      {/* 오른쪽 아이콘 */}
      {!isHide && (
        <TouchableOpacity onPress={onRightPress} style={styles.iconContainer}>
          {text == "저장" ? (
            <Text>저장</Text>
          ) : (
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={path == "closet" ? "white" : "black"}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // 양쪽 끝에 배치
    alignItems: "center",
    height: 60,
    backgroundColor: Colors.background,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // 중앙 정렬을 위해 flex 1 사용
  },
  iconContainer: {
    padding: 8,
  },
});

export default CommonHeader;
