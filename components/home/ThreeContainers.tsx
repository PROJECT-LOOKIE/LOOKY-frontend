import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import EmptyLookIcon from "../../assets/images/emptylook.svg";
import TalkIcon from "../../assets/images/talk.svg";

// 화면 너비 가져오기
const screenWidth = Dimensions.get("window").width;

export default function ThreeContainers() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      snapToInterval={screenWidth * 0.38 + 12} 
      decelerationRate="fast"
      snapToAlignment="start"
    >
      {/* 첫 번째 컨테이너 */}
      <TouchableOpacity
        style={[styles.itemContainer, { width: screenWidth * 0.38 }]} 
        onPress={() => console.log("첫 번째 컨테이너 클릭")}
      >
        <EmptyLookIcon width={43} height={43} style={styles.icon} />
        <Text style={styles.text}>아직 룩을{"\n"}선택 안했어요</Text>
        <View style={styles.userBar}>
          <TalkIcon width={24} height={24} style={styles.userIcon} />
          <Text style={styles.userName}>김강민</Text>
        </View>
      </TouchableOpacity>

      {/* 두 번째 컨테이너 */}
      <TouchableOpacity
        style={[styles.itemContainer, { width: screenWidth * 0.38 }]}
        onPress={() => console.log("두 번째 컨테이너 클릭")}
      >
        <EmptyLookIcon width={43} height={43} style={styles.icon} />
        <Text style={styles.text}>아직 룩을{"\n"}선택 안했어요</Text>
        <View style={styles.userBar}>
          <TalkIcon width={24} height={24} style={styles.userIcon} />
          <Text style={styles.userName}>김강민</Text>
        </View>
      </TouchableOpacity>

      {/* 세 번째 컨테이너 */}
      <TouchableOpacity
        style={[styles.itemContainer, { width: screenWidth * 0.38 }]}
        onPress={() => console.log("세 번째 컨테이너 클릭")}
      >
        <EmptyLookIcon width={43} height={43} style={styles.icon} />
        <Text style={styles.text}>아직 룩을{"\n"}선택 안했어요</Text>
        <View style={styles.userBar}>
          <TalkIcon width={24} height={24} style={styles.userIcon} />
          <Text style={styles.userName}>김강민</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    backgroundColor: "#F4F8F3",
  },
  itemContainer: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#121212",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 270,
    marginRight: 12, 
  },
  icon: {
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#9A9A9A",
    textAlign: "center",
    marginBottom: 30,
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
    bottom: 0,
    alignSelf: "stretch",
    width: "100%",
  },
  userIcon: {
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
});