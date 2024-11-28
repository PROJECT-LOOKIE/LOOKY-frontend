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
import { deleteClothItem, getClothItem } from "@/api/closet";
import { responseClothInfoDTO } from "@/model/closet/requestNewCloth";
import { MenuProvider } from "react-native-popup-menu";

export default function ClothRevise() {
  const { id } = useGlobalSearchParams();
  const itemId = Number(id);
  const [clothItem, setClothItem] = useState<responseClothInfoDTO>();

  const fetchClothesDetail = async (itemId: number) => {
    try {
      const info = await getClothItem(itemId);
      setClothItem(info.payload || []);
    } catch (err) {
      console.error("Failed to fetch cloth item:", err);
    }
  };

  useEffect(() => {
    fetchClothesDetail(itemId);
  }, []);

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const categoryList = ["아우터", "상의", "하의", "신발", "악세사리"];
  const handleLeftPress = () => {
    router.back();
  };

  const handleRightPress = async () => {
    try {
      await deleteClothItem(itemId);
      router.push("/closet");
    } catch (err) {
      console.error("Failed to delete cloth item:", err);
    }
  };

  const handleChangeText = (event: string) => {
    setBrand(event);
    console.log(`브랜드 입력 중... ${event}`);
  };

  const handleChanteNumber = (event: number) => {
    setPrice(event);
    console.log(`가격 입력 중... ${event}`);
  };

  const handlePress = () => {
    router.push("/cordi");
  };

  return (
    <View style={[styles.container, styles.background]}>
      <MenuProvider>
        <CommonHeader
          onLeftPress={handleLeftPress}
          onRightPress={handleRightPress}
          path="closet"
          style={styles.background}
          // isHide={true}
        />
      </MenuProvider>
      <ImageContent
        image={clothItem ? clothItem.imageUrl : "등록된 이미지가 없습니다."}
      />
      <Text style={styles.title}>브랜드</Text>
      <CommonTextInput
        placeholder="브랜드를 입력해주세요."
        onChangeText={handleChangeText}
        value={clothItem ? clothItem.brand : ""}
      />
      <Text style={styles.title}>카테고리</Text>
      <View>
        <Category
          categoryList={categoryList}
          item={clothItem ? clothItem.category : ""}
        />
      </View>
      <Text style={styles.title}>가격</Text>
      <CommonNumInput
        placeholder="가격을 입력해주세요."
        onChangeNumber={handleChanteNumber}
        value={clothItem ? String(clothItem.price) : ""}
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
