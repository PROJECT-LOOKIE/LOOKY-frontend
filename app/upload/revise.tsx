import { ScrollView, View, StyleSheet, Text, Button } from "react-native";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import CommonHeader from "@/components/CommonHeader";
import ImageContent from "@/components/upload/imageContent";
import CommonTextInput from "@/components/CommonTextInput";
import { useState } from "react";
import Category from "@/components/Category";
import CommonNumInput from "@/components/CommonNumInput";
import NextButton from "@/components/schedule/NextButton";

export default function ClothRevise() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const categoryList = ["아우터", "상의", "하의", "신발", "악세사리"];
  const handleLeftPress = () => {
    router.back();
  };

  const handleRightPress = () => {
    console.log("아이폰 모달 등장 | 공유, 삭제");
  };

  const handleChangeText = (event: string) => {
    setBrand(event);
  };

  const handleChanteNumber = (event: number) => {
    setPrice(event);
  };

  const handlePress = () => {
    console.log("등록하기");
  };

  return (
    <View style={[styles.container, styles.background]}>
      <CommonHeader
        onLeftPress={handleLeftPress}
        onRightPress={handleRightPress}
        path="closet"
        style={styles.background}
        // isHide={true}
      />
      <ImageContent />
      <Text style={styles.title}>브랜드</Text>
      <CommonTextInput
        placeholder="브랜드를 입력해주세요."
        onChangeText={(event) => {
          handleChangeText;
        }}
      />
      <Text style={styles.title}>카테고리</Text>
      <View>
        <Category categoryList={categoryList} />
      </View>
      <Text style={styles.title}>가격</Text>
      <CommonNumInput
        placeholder="가격을 입력해주세요."
        onChangeNumber={(event) => {
          handleChanteNumber;
        }}
      />
      <NextButton onPress={handlePress} text="수정하기" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // alignItems: "center",
    gap: 20,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  background: {
    backgroundColor: "black",
  },
  scrollContainer: {
    gap: 20,
    paddingTop: 60,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
