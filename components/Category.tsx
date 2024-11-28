import Colors from "@/constants/Colors";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BoldText } from "./StyledText";
import { useEffect } from "react";

interface CategoryProps {
  categoryList: Array<string>; // props의 타입 정의
  style?: ViewStyle;
  item?: string;
  clickCategory: (idx: number) => void;
}

export default function Category({
  categoryList,
  style,
  item,
  clickCategory,
}: CategoryProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {categoryList.map((category, idx) => {
        const isSelected = category === item;
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
