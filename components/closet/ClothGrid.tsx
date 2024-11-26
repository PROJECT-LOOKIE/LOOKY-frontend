import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "../Themed";
import Colors from "@/constants/Colors";

export default function ClothGrid() {
  const items = [
    "아이템 1",
    "아이템 2",
    "아이템 3",
    "아이템 4",
    "아이템 5",
    "아이템 6",
    "아이템 7",
    "아이템 8",
    "아이템 9",
    "아이템 10",
    "아이템 11",
    "아이템 12",
    "아이템 13",
    "아이템 14",
    "아이템 15",
    "아이템 16",
    "아이템 17",
    "아이템 18",
    "아이템 19",
    "아이템 20",
    "아이템 21",
  ];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            {/* <Text>{item}</Text> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  item: {
    width: "30%",
    paddingBottom: "30%",
    backgroundColor: Colors.gray100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 10,
    position: "relative",
  },
});
