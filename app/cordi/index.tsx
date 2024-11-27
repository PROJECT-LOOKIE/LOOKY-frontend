import Banner from "@/components/codi/Banner";
import { View, StyleSheet } from "react-native";

export default function Cordi() {
  return (
    <View style={styles.container}>
      <Banner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 75,
  },
});
