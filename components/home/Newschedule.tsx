import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import TagIcon from "../../assets/images/#.svg";
import PeopleIcon from "../../assets/images/people.svg";
import PlaceIcon from "../../assets/images/place.svg";
import ArrowIcon from "../../assets/images/arrow.svg";
import EmptyLookSection from "../../components/home/EmptyLookSection";
import TwoContainers from "../../components/home/TwoContainers";
import ThreeContainers from "./ThreeContainers";


export default function NewscheduleEmpty() {
  return (
    <View style={styles.scheduleContainer}>
      {/* 상단 제목 및 태그 */}
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>🏃‍♂️</Text>
          <Text style={styles.scheduleTitle}>한강공원 런닝</Text>
          <TouchableOpacity onPress={() => router.push("/home")}>
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

      {/* EmptyLookSection 컴포넌트 사용 */}
      {/* <EmptyLookSection></EmptyLookSection> */}
      {/* <TwoContainers></TwoContainers> */}
      <ThreeContainers></ThreeContainers>
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
});