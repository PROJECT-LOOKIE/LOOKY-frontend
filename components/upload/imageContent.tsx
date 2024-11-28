import { StyleSheet, Text, View, Image } from "react-native";

type ImageContentProps = {
  image: string | null;
};

export default function ImageContent({ image }: ImageContentProps) {
  return (
    <View style={styles.container}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },
});
