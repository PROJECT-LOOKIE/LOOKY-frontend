import { deleteClothItem } from "@/api/closet";
import Category from "@/components/Category";
import ClothGrid from "@/components/closet/ClothGrid";
import CordiZone from "@/components/closet/CordiZone";
import Banner from "@/components/codi/Banner";
import MakeCordi from "@/components/codi/makeCordi";
import CommonHeader from "@/components/CommonHeader";
import CategorySelector from "@/components/schedule/CategorySelector";
import Colors from "@/constants/Colors";
import {
  deleteDataSecurely,
  getDataSecurely,
} from "@/utils/schedule/stroageUtills";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { MenuProvider } from "react-native-popup-menu";

export default function Cordi() {
  const categoryList = ["아우터", "상의", "하의", "신발", "악세사리"];
  const [category, setCategory] = useState("아우터");
  const [imageUrl, setImageUrl] = useState<string | null>(
    "https://imagedata-ec2-lookie.s3.ap-northeast-2.amazonaws.com/%2Fimages/clothes/20241126212358-85f31988-701c-4e43-bdc3-cccbd3400ccf-%EB%A7%A8%ED%88%AC%EB%A7%A8%EC%83%98%ED%94%8C?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241128T024713Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIAZQ3DTIFA33LHORUU%2F20241128%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=c253456159971fdeec50c2c54ce3131d2543a1f79728eaecdb3a87c3068cfc43"
  );
  useEffect(() => {
    console.log(`imageUrl has been updated: ${imageUrl}`);
  }, [imageUrl]);

  // getDataSecurely("imageUrl").then((value) => {
  //   console.log(value); // 저장된 값 출력

  //   setImageUrl(value);

  //   deleteDataSecurely("imageUrl");
  // });

  const clickCategory = (idx: number) => {
    setCategory(categoryList[idx]);
  };

  const onLeftPress = () => {
    router.back();
  };

  const onRightPress = () => {
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <MenuProvider>
        <CommonHeader
          onLeftPress={onLeftPress}
          onRightPress={onRightPress}
          text="저장"
          style={styles.background}
        />
        <Banner />
        <MakeCordi url={imageUrl} />
        {/* <View style={styles.cordiContainer}>
          {imageUrl ? (
            <Image
              source={{
                uri: "https://imagedata-ec2-lookie.s3.ap-northeast-2.amazonaws.com/%2Fimages/clothes/20241126212358-85f31988-701c-4e43-bdc3-cccbd3400ccf-%EB%A7%A8%ED%88%AC%EB%A7%A8%EC%83%98%ED%94%8C?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241128T024713Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIAZQ3DTIFA33LHORUU%2F20241128%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=c253456159971fdeec50c2c54ce3131d2543a1f79728eaecdb3a87c3068cfc43",
              }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <></>
          )}
        </View> */}
        <ScrollView style={styles.selectContainer}>
          <Category
            categoryList={categoryList}
            item={category}
            clickCategory={clickCategory}
            style={styles.categoryStyle}
          />
          <ClothGrid mode="cordi" />
        </ScrollView>
      </MenuProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 75,
    backgroundColor: Colors.background,
    height: "100%",
  },
  background: {
    backgroundColor: Colors.background,
  },
  cordiContainer: {
    flex: 1,
    paddingTop: 50,
    width: "100%",
  },
  selectContainer: {
    flex: 1,
    width: "100%",
  },
  categoryStyle: {
    marginBottom: 20,
  },
});
