import { ScrollView, View, StyleSheet, Text, Button } from "react-native";
import Colors from "@/constants/Colors";
import { router, useGlobalSearchParams } from "expo-router";
import CommonHeader from "@/components/CommonHeader";
import ImageContent from "@/components/upload/imageContent";
import CommonTextInput from "@/components/CommonTextInput";
import { useEffect, useState } from "react";
import Category from "@/components/Category";
import CommonNumInput from "@/components/CommonNumInput";
import NextButton from "@/components/schedule/NextButton";
import { postClothInfo } from "@/api/closet";
import { getDataSecurely } from "@/utils/schedule/stroageUtills";

export default function ClothInfo() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const categoryList = ["아우터", "상의", "하의", "신발", "악세사리"];
  const [category, setCategory] = useState("아우터");
  const [displayImage, setDisplayImage] = useState<string | null>("");
  const [imageUrl, setImageUrl] = useState<string | null>("");

  useEffect(() => {
    const getImageData = async () => {
      const displayImage = await getDataSecurely("displayImage");
      const uploadImage = await getDataSecurely("uploadClothImage");
      setDisplayImage(displayImage);
      setImageUrl(uploadImage);
    };
    getImageData();
  }, []);

  const handleLeftPress = () => {
    router.back();
  };

  const handleChangeText = (event: string) => {
    setBrand(event);
  };

  const handleChanteNumber = (event: number) => {
    setPrice(event);
  };

  const clickCategory = (idx: number) => {
    setCategory(categoryList[idx]);
  };

  const handlePress = async () => {
    console.log(imageUrl);
    await postClothInfo({ brand, category, price, imageUrl });
    router.push("/home");
  };

  return (
    <View style={[styles.container, styles.background]}>
      <CommonHeader
        onLeftPress={handleLeftPress}
        path="closet"
        style={styles.background}
        isHide={true}
      />
      <ImageContent image={displayImage} />
      <Text style={styles.title}>브랜드</Text>
      <CommonTextInput
        placeholder="브랜드를 입력해주세요."
        onChangeText={handleChangeText}
      />
      <Text style={styles.title}>카테고리</Text>
      <View>
        <Category
          categoryList={categoryList}
          item={category}
          clickCategory={clickCategory}
        />
      </View>
      <Text style={styles.title}>가격</Text>
      <CommonNumInput
        placeholder="가격을 입력해주세요."
        onChangeNumber={handleChanteNumber}
      />
      <NextButton onPress={handlePress} text="등록하기" />
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
