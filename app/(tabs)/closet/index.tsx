import { Pressable, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import ClothType from "@/components/closet/ClothType";
import ClothGrid from "@/components/closet/ClothGrid";
import Colors from "@/constants/Colors";
import AddButton from "@/components/closet/AddButton";

export default function Closet() {
  return (
    <View style={styles.container}>
      <ClothType />
      <ClothGrid mode="closet" />
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
});
