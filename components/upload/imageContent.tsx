import { StyleSheet, Text, View } from "react-native";

export default function ImageContent() {
  return (
    <View style={styles.container}>
      <Text>image 영역</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    height: "40%",
  },
});
