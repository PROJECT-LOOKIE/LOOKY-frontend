import Colors from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

type MakeCordiProps = {
  url: string | null;
};

const ImageItem: React.FC<{
  imageUrl: string;
  onDelete: () => void;
  onFocus: () => void;
  isFocused: boolean;
}> = ({ imageUrl, onDelete, onFocus, isFocused }) => {
  const [imagePosition, setImagePosition] = useState({
    x: Math.random() * 200 - 100, // -100 to 100
    y: Math.random() * 200 - 100, // -100 to 100
  });
  const [imageScale, setImageScale] = useState(1);

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    setImagePosition({
      x: event.nativeEvent.translationX,
      y: event.nativeEvent.translationY,
    });
  };

  const onPinchEvent = (event: PinchGestureHandlerGestureEvent) => {
    setImageScale(event.nativeEvent.scale);
  };

  return (
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
            borderColor: isFocused ? "black" : "transparent", // 포커스된 이미지에만 블랙 테두리 추가
            borderWidth: isFocused ? 3 : 0, // 포커스된 이미지에만 테두리 크기 설정
          },
        ]}
      >
        <PinchGestureHandler onGestureEvent={onPinchEvent}>
          <Animated.View style={styles.imageWrapper}>
            <TouchableOpacity onPress={onFocus}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </TouchableOpacity>
            {/* 삭제 버튼을 포커스된 이미지에만 보이게 설정 */}
            {isFocused && (
              <TouchableOpacity style={styles.closeButton} onPress={onDelete}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const MakeCordi: React.FC<MakeCordiProps> = ({ url }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null); // 포커싱된 이미지의 인덱스를 추적

  useEffect(() => {
    if (url) {
      setImageUrls((prevUrls) => [...prevUrls, url]);
      setFocusedIndex(imageUrls.length); // 새로 추가된 아이템을 포커싱
    }
  }, [url]);

  const handleDeleteImage = (index: number) => {
    const updatedUrls = [...imageUrls];
    updatedUrls.splice(index, 1); // 해당 인덱스 이미지 제거
    setImageUrls(updatedUrls);

    // 삭제 후, 포커싱된 이미지가 삭제된 경우 포커스를 해제
    if (focusedIndex === index) {
      setFocusedIndex(null);
    }
  };

  const handleFocusImage = (index: number) => {
    setFocusedIndex(index); // 이미지에 포커스를 설정
  };

  // 배경 클릭 시 포커스를 해제하는 함수
  const handleBackgroundPress = () => {
    setFocusedIndex(null); // 포커스를 해제
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleBackgroundPress}>
        <View style={styles.container}>
          <View style={styles.cordiContainer}>
            {imageUrls.map((imageUrl, index) => (
              <ImageItem
                key={index}
                imageUrl={imageUrl}
                onDelete={() => handleDeleteImage(index)}
                onFocus={() => handleFocusImage(index)}
                isFocused={focusedIndex === index}
              />
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    position: "absolute",
    borderStyle: "dashed",
    borderColor: Colors.gray800,
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
