import Colors from "@/constants/Colors";
import Category from "../Category";
import { Text, View } from "../Themed";
import { StyleSheet } from "react-native";

export default function ClothType() {
  const items = ["전체", "아우터", "상의", "하의", "신발", "악세사리"];
  return (
    <View style={styles.container}>
      <Category categoryList={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    backgroundColor: Colors.background,
  },
});
