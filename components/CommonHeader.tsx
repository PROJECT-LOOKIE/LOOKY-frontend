import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import Colors from "@/constants/Colors";

type CommonHeaderProps = {
  onLeftPress: () => void;
  onRightPress?: () => void;
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
        <Menu>
          {!isHide && text == "저장" ? (
            <Text style={styles.saveText} onPress={onRightPress}>
              저장
            </Text>
          ) : (
            <MenuTrigger>
              <Ionicons
                name="ellipsis-horizontal"
                size={24}
                color={path == "closet" ? "white" : "black"}
              />
            </MenuTrigger>
          )}
          <MenuOptions
            optionsContainerStyle={{
              height: 44,
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              borderRadius: 20,
              paddingHorizontal: 20,
            }}
          >
            <MenuOption onSelect={onRightPress} text="삭제하기" />
          </MenuOptions>
        </Menu>
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
  iconContainer: {
    padding: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default CommonHeader;
