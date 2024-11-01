import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import CordiZone from "@/components/closet/CordiZone";
import ClothType from "@/components/closet/ClothType";
import ClothGrid from "@/components/closet/ClothGrid";
import Colors from "@/constants/Colors";
import AddButton from "@/components/closet/AddButton";

export default function Closet() {
  return (
    <View style={styles.container}>
      <CordiZone />
      <ClothType />
      <ClothGrid />

      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
    gap: 20,
    paddingTop: 75,
    paddingHorizontal: 20,
  },

  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: "80%",
  // },
});
