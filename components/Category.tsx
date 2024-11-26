import Colors from "@/constants/Colors";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BoldText } from "./StyledText";
import { useState } from "react";

// props : 카테고리 텍스트 리스트들 [전체, 아우터, 상의, 하의 ...]
interface CategoryProps {
  categoryList: Array<string>; // props의 타입 정의
  style?: ViewStyle;
}

export default function Category({ categoryList, style }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const clickCategory = (idx: number) => {
    setSelectedCategory(idx);
  };

  return (
    <ScrollView
      horizontal // 수평 스크롤 활성화
      showsHorizontalScrollIndicator={false} // 스크롤 바 숨기기
      contentContainerStyle={[styles.container]} // 스타일 적용
    >
      {categoryList.map((category, idx) => {
        const isSelected = idx === selectedCategory;
        return (
          <TouchableOpacity
            key={idx}
            style={[styles.categoryItem, isSelected && styles.selectedItem]}
            onPress={() => clickCategory(idx)}
          >
            <BoldText
              style={{
                fontSize: 16,
                color: isSelected ? "black" : Colors.gray400,
              }}
            >
              {category}
            </BoldText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  categoryItem: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginRight: 10,
    borderColor: Colors.gray400,
    borderWidth: 2,
  },
  selectedItem: {
    backgroundColor: Colors.yellowGreen,
    borderColor: "black",
    borderWidth: 2,
  },
});
