import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { getClosetItems } from "@/api/closet";
import { responseClothInfoDTO } from "@/model/closet/requestNewCloth";
import { Mode } from "@/model/cordi/groupInfo";
import { saveDataSecurely } from "@/utils/schedule/stroageUtills";

type ClothGridItem = {
  setImageUrl: (url: string) => void;
};

export default function ClothGrid({ mode, setImageUrl }: Mode & ClothGridItem) {
  const [clothesInfo, setClothesInfo] = useState<responseClothInfoDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchClothes = async () => {
    try {
      const clothes = await getClosetItems();
      setClothesInfo(clothes.payload || []);
    } catch (error) {
      console.error("Failed to fetch clothes:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchClothes().finally(() => setLoading(false));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchClothes().finally(() => setRefreshing(false));
  }, []);

  const handleChangePage = (id: number) => {
    router.push({ pathname: "/upload/revise", params: { id } });
  };

  const handlePick = async (id: number) => {
    console.log(`${id}번 아이템 pick`);
    const pickImage = clothesInfo.find((prev) => prev.id === id)?.imageUrl;
    if (pickImage) {
      setImageUrl(pickImage);
    }
  };

  return (
    <View style={styles.wrapper}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.yellowGreen} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.gray600}
            />
          }
        >
          {clothesInfo.length > 0 ? (
            clothesInfo.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => {
                  mode === "closet"
                    ? handleChangePage(item.id)
                    : handlePick(item.id);
                }}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))
          ) : (
            <></>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
    width: "100%",
  },
  item: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: Colors.gray100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
  },
});
