import Colors from "@/constants/Colors";
import Category from "../Category";
import { Text, View } from "../Themed";
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function ClothType() {
  const items = ["전체", "아우터", "상의", "하의", "신발", "악세사리"];
  const [category, setCategory] = useState("전체");

  const clickCategory = (idx: number) => {
    setCategory(items[idx]);
  };

  return (
    <View style={styles.container}>
      <Category
        categoryList={items}
        item={category}
        clickCategory={clickCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.background,
    marginBottom: 4,
  },
});
