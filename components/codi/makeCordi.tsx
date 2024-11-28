import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type MakeCordiProps = {
  url: string | null;
};

const MakeCordi: React.FC<MakeCordiProps> = ({ url }) => {
  const [imageUrl, setImageUrl] = useState(url);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [imageRot, setImageRot] = useState(0);

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    setImagePosition({
      x: event.nativeEvent.translationX,
      y: event.nativeEvent.translationY,
    });
  };

  console.log(imagePosition);

  const onPinchEvent = (event: PinchGestureHandlerGestureEvent) => {
    setImageScale(event.nativeEvent.scale);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.cordiContainer}>
          {imageUrl ? (
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View
                style={[
                  styles.imageContainer,
                  {
                    transform: [
                      { translateX: imagePosition.x },
                      { translateY: imagePosition.y },
                      { scale: imageScale },
                    ],
                  },
                ]}
              >
                <PinchGestureHandler onGestureEvent={onPinchEvent}>
                  <Animated.View style={styles.imageWrapper}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setImageUrl("")}
                    >
                      <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </PinchGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          ) : (
            <></>
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cordiContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "dashed",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "darkred",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MakeCordi;
