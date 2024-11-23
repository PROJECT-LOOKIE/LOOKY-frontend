import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import EmptyLookIcon from "../../assets/images/emptylook.svg";
import TalkIcon from "../../assets/images/talk.svg";

export default function EmptyLookSection() {
  return (
    <TouchableOpacity style={styles.emptyLookContainer} onPress={() => router.push("/home")}>
      <EmptyLookIcon width={43} height={43} style={styles.emptyIcon} />
      <Text style={styles.emptyText}>아직 룩을{"\n"}선택 안했어요</Text>
      {/* 사용자 정보 (검정색 박스) */}
      <View style={styles.userBar}>
        <TalkIcon width={24} height={24} style={styles.userIcon} />
        <Text style={styles.userName}>김강민</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  emptyLookContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#121212",
    height: 270,
    borderRadius: 8,
    padding: 20,
    position: "relative",
  },
  emptyIcon: {
    marginBottom: 10,
    textAlign: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9A9A9A",
    textAlign: "center",
    marginBottom: 20,
  },
  userBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#121212", 
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 0,
    position: "absolute",
    alignSelf: "stretch",
    bottom: 0,
    width: "113%",
  },
  userIcon: {
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});