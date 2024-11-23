import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router"; 
import TagIcon from "../../assets/images/#.svg";
import PeopleIcon from "../../assets/images/people.svg";
import PlaceIcon from "../../assets/images/place.svg";
import EmptyLookIcon from "../../assets/images/emptylook.svg"; 
import TalkIcon from "../../assets/images/talk.svg"; 
import ArrowIcon from "../../assets/images/arrow.svg"; 

export default function NewscheduleEmpty() {
  return (
    <View style={styles.scheduleContainer}>
      {/* 상단 제목 및 태그 */}
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>🏃‍♂️</Text>
          <Text style={styles.scheduleTitle}>한강공원 런닝</Text>
          <TouchableOpacity onPress={() => router.push("/home")}> // 옷장으로 이동
            <ArrowIcon width={16} height={16} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <TagIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.infoText}>운동</Text>
          </View>
          <View style={styles.infoItem}>
            <PlaceIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.infoText}>반포 한강공원</Text>
          </View>
          <View style={styles.infoItem}>
            <PeopleIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.infoText}>박진홍 외 12명</Text>
          </View>
        </View>
      </View>

      {/* 아직 룩을 선택 안했어요 섹션 */}
      <TouchableOpacity style={styles.emptyLookContainer} onPress={() => router.push("/home")}> // 여기서 옷장으로 이동
        <EmptyLookIcon width={43} height={43} style={styles.emptyIcon} />
        <Text style={styles.emptyText}>아직 룩을{"\n"}선택 안했어요</Text>

        {/* 사용자 정보 (검정색 박스) */}
        <View style={styles.userBar}>
          <TalkIcon width={24} height={24} style={styles.userIcon} />
          <Text style={styles.userName}>김강민</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  scheduleContainer: {
    padding: 20,
    flex: 1,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 26,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
    marginRight: 10,
  },
  arrowIcon: {
    marginRight: 10,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  icon: {
    marginRight: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#121212",
  },
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
    paddingHorizontal: 10,
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